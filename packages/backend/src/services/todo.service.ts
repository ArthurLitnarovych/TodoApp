import { PrismaClient, Todo, User } from '@prisma/client';
import { Filter, Pages } from '@/types/filter.type';

const prismaTodo = new PrismaClient();

export default class TodoService {
	async findAll(
		filter: Filter,
		pages: Pages,
	): Promise<{ todos: Todo[]; totalPages: number }> {
		const { email, privatef, complete, publicf, search } = filter;
		const { page, offset } = pages;
		const take = offset ? parseInt(offset) : 10;
		const skip = page ? take * (parseInt(page) - 1) : 0;
		const query = {
			where: {
				OR: [
					{ isPrivate: false },
					{ AND: { isPrivate: true, authorEmail: email } },
				],
				...(privatef && { isPrivate: privatef }),
				...(publicf && { isPrivate: !publicf }),
				...(complete && { isCompleted: complete }),
				name: {
					contains: search,
					mode: 'insensitive' as const,
				},
			},
		};
		const todos: Todo[] = await prismaTodo.todo.findMany({
			...query,
			skip,
			take,
		});
		const total: number = await prismaTodo.todo.count(query);
		const totalPages = Math.ceil(total / take);
		return { todos, totalPages };
	}

	async create(todo: Todo): Promise<void> {
		await prismaTodo.todo.create({
			data: todo,
		});
	}

	async edit(id: string, newTodo: Todo): Promise<Todo | null> {
		const todo: Todo | null = await prismaTodo.todo.update({
			where: {
				id,
			},
			data: newTodo,
		});
		return todo;
	}

	async findById(id: string): Promise<Todo | null> {
		const todo: Todo | null = await prismaTodo.todo.findUnique({
			where: {
				id,
			},
		});
		return todo;
	}

	async complete(id: string, completed: boolean): Promise<Todo | null> {
		const todo: Todo | null = await prismaTodo.todo.update({
			where: {
				id,
			},
			data: {
				isCompleted: completed,
			},
		});
		return todo;
	}

	async private(id: string, privated: boolean): Promise<Todo | null> {
		const todo: Todo | null = await prismaTodo.todo.update({
			where: {
				id,
			},
			data: {
				isPrivate: privated,
			},
		});
		return todo;
	}

	async delete(id: string): Promise<void> {
		await prismaTodo.todo.delete({
			where: {
				id,
			},
		});
	}
}
