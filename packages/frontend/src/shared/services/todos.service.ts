import {
	Pages,
	TodoCreateType,
	TodoEditType,
	TodoFilters,
} from '~typings/todo.type';
import HttpService from './http.service';

class TodoService extends HttpService {
	constructor() {
		super();
	}
	getAllTodos(filter: TodoFilters, pages: Pages) {
		return this.get(
			{
				url: `todos/all?privatef=${filter.private}&completed=${filter.complete}&publicf=${filter.public}&search=${filter.search}&page=${pages.page}&offset=${pages.offset}`,
			},
			true,
		);
	}
	editTodo(todo: TodoEditType) {
		return this.put(
			{
				url: `todos/edit/${todo.id}`,
				data: { ...todo, id: undefined },
			},
			true,
		);
	}
	deleteTodo(todoId: string) {
		return this.delete(
			{
				url: `todos/delete/${todoId}`,
			},
			true,
		);
	}
	createTodo(todo: TodoCreateType) {
		return this.post(
			{
				url: 'todos/create',
				data: todo,
			},
			true,
		);
	}
	getOneTodo(todoId: string) {
		return this.get(
			{
				url: `todos/one/${todoId}`,
			},
			true,
		);
	}
	completeTodo(todoId: string) {
		return this.get(
			{
				url: `todos/complete/${todoId}`,
			},
			true,
		);
	}
	privatizeTodo(todoId: string) {
		return this.get(
			{
				url: `todos/privatize/${todoId}`,
			},
			true,
		);
	}
}

const todoService = new TodoService();
export default todoService;
