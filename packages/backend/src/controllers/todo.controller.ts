import { Response, Request, NextFunction } from 'express';
import { TryCatch } from '@/utils/tryCatch';
import TodoService from '@/services/todo.service';
import { RequestWithUser } from '@/types/request.type';
import { Filter, Pages } from '@/types/filter.type';

export class TodoController {
	constructor(private todoService: TodoService) {}

	@TryCatch
	async getAllTodo(req: RequestWithUser, res: Response): Promise<void> {
		if (!req.user) throw new Error('No user provided');
		if (!req.user.email) throw new Error('No email provided');
		const { privatef, completed, publicf, search, page, offset } =
			req.query;
		const filters: Filter = {
			email: req.user.email,
			privatef: privatef ? !!privatef : undefined,
			complete: completed ? !!completed : undefined,
			publicf: publicf ? !!publicf : undefined,
			search: typeof search === 'string' ? search : undefined,
		};
		const pages: Pages = {
			page: typeof page === 'string' ? page : undefined,
			offset: typeof offset === 'string' ? offset : undefined,
		};
		const { todos, totalPages } = await this.todoService.findAll(
			filters,
			pages,
		);
		res.status(200).json({ todos, pages: totalPages });
	}

	@TryCatch
	async createTodo(req: RequestWithUser, res: Response): Promise<void> {
		if (!req.user) throw new Error('No user provided');
		if (!req.user.email) throw new Error('No email provided');
		await this.todoService.create({
			...req.body,
			authorEmail: req.user.email,
		});
		res.status(200).json({ message: 'Todo created successfully' });
	}

	@TryCatch
	async getOneTodo(req: RequestWithUser, res: Response): Promise<void> {
		if (!req.user) throw new Error('No user provided');
		const todo = await this.todoService.findById(req.params.id);
		if (todo?.isPrivate && todo?.authorEmail !== req.user.email)
			throw new Error('This todo is private');

		res.status(200).json(todo);
	}

	@TryCatch
	async editTodo(req: Request, res: Response): Promise<void> {
		await this.todoService.edit(req.params.id, req.body);
		res.status(200).json({ message: 'Todo edited successfully' });
	}

	@TryCatch
	async completeTodo(req: Request, res: Response): Promise<void> {
		const todoToEdit = await this.todoService.findById(req.params.id);
		await this.todoService.complete(
			req.params.id,
			!todoToEdit?.isCompleted,
		);
		res.status(200).json({ message: 'Todo edited successfully' });
	}

	@TryCatch
	async privatizeTodo(req: Request, res: Response): Promise<void> {
		const todoToEdit = await this.todoService.findById(req.params.id);
		await this.todoService.private(req.params.id, !todoToEdit?.isPrivate);
		res.status(200).json({ message: 'Todo edited successfully' });
	}

	@TryCatch
	async deleteTodo(req: Request, res: Response): Promise<void> {
		await this.todoService.delete(req.params.id);
		res.status(200).json({ message: 'Todo deleted successfully' });
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
