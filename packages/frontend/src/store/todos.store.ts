import { create } from 'zustand';
import { TodoCreateType, TodoEditType, TodoType } from '~typings/todo.type';
import TodoService from '~shared/services/todos.service';
import todoService from '~shared/services/todos.service';
import { toast } from 'react-toastify';

type State = {
	todos: TodoType[];
	todoSlides: TodoType[];
	todo: TodoType;
	limit: number;
	loading: boolean;
	del: boolean;
	error: string;
	todoToDelete: string;
	search: string;
	privatef: string;
	completed: string;
	publicf: string;
	create: boolean;
	page: number;
	pages: number;
	slide: number;
	slides: number;
};

type Actions = {
	fetchTodos: () => Promise<void>;
	fetchSlides: () => Promise<void>;
	resetSlides: () => Promise<void>;
	addTodo: (todo: TodoCreateType) => Promise<void>;
	deleteT: (id: string) => void;
	deleteF: () => void;
	deleteTodo: (id: string) => Promise<void>;
	fetchTodo: (id: string) => Promise<void>;
	editTodo: (todo: TodoEditType) => Promise<void>;
	setSearch: (text: string) => void;
	setComplete: () => void;
	setPrivate: () => void;
	setPublic: () => void;
	setPage: (page: number) => void;
	nextSlide: () => void;
	complete: (id: string) => Promise<void>;
	privatize: (id: string) => Promise<void>;
};

const useTodoStore = create<State & Actions>((set, get) => ({
	todos: [],
	todoSlides: [],
	todo: {
		id: '',
		name: '',
		description: '',
		isPrivate: false,
		isCompleted: false,
		authorEmail: '',
		createdAt: '',
		updatedAt: '',
	},
	limit: 10,
	loading: false,
	del: false,
	error: '',
	todoToDelete: '',
	search: '',
	privatef: '',
	completed: '',
	publicf: '',
	create: false,
	page: 1,
	pages: 1,
	slide: 1,
	slides: 1,
	fetchTodos: async () => {
		set({ loading: true });

		try {
			const { search, privatef, publicf, completed, page, limit } = get();
			const response = await TodoService.getAllTodos(
				{
					search,
					private: privatef,
					public: publicf,
					complete: completed,
				},
				{ page, offset: limit },
			);

			if (!(response.status == 200))
				throw new Error('Failed to get todos!');

			const { todos, pages } = await response.data;

			set({ todos, loading: false, pages });
		} catch (error) {
			set({ loading: false, error: error.message, pages: 1 });
			toast.error(
				error.response.data.message ??
					error.response.data.details[0].message ??
					error.message,
			);
		} finally {
			set({ loading: false });
		}
	},
	fetchSlides: async () => {
		set({ loading: true });

		try {
			const { search, privatef, publicf, completed, slide, limit } =
				get();
			const response = await TodoService.getAllTodos(
				{
					search,
					private: privatef,
					public: publicf,
					complete: completed,
				},
				{ page: slide, offset: limit },
			);

			if (!(response.status == 200))
				throw new Error('Failed to get todos!');

			const { todos, pages } = await response.data;

			set({
				todoSlides: [...get().todoSlides, ...todos],
				loading: false,
				slides: pages,
			});
		} catch (error) {
			set({
				loading: false,
				error: error.message,
				todoSlides: [],
				slide: 1,
			});
			toast.error(
				error.response.data.message ??
					error.response.data.details[0].message ??
					error.message,
			);
		} finally {
			set({ loading: false });
		}
	},
	resetSlides: async () => {
		set({ loading: true });

		try {
			const { search, privatef, publicf, completed, limit } = get();
			const response = await TodoService.getAllTodos(
				{
					search,
					private: privatef,
					public: publicf,
					complete: completed,
				},
				{ page: 1, offset: limit },
			);

			if (!(response.status == 200))
				throw new Error('Failed to get todos!');

			const { todos, pages } = await response.data;

			set({
				todoSlides: todos,
				loading: false,
				slides: pages,
				slide: 1,
			});
		} catch (error) {
			set({
				loading: false,
				error: error.message,
				todoSlides: [],
				slide: 1,
			});
			toast.error(
				error.response.data.message ??
					error.response.data.details[0].message ??
					error.message,
			);
		} finally {
			set({ loading: false });
		}
	},
	addTodo: async (todo) => {
		set({ loading: true });

		try {
			const response = await TodoService.createTodo(todo);

			if (!(response.status == 200))
				throw new Error('Failed to create todo!');

			toast.success('Todo created');

			set({ loading: false, create: !get().create });
		} catch (error) {
			set({ loading: false, error: error.message });
			toast.error(
				error.response.data.message ??
					error.response.data.details[0].message ??
					error.message,
			);
		} finally {
			set({ loading: false });
		}
	},
	deleteTodo: async (id: string) => {
		set({ loading: true });
		try {
			await TodoService.deleteTodo(id);

			toast.success('Todo deleted');

			set({ loading: false, todoToDelete: '', create: !get().create });
		} catch (error) {
			set({ loading: false, todoToDelete: '', error: error.message });
			toast.error(
				error.response.data.message ??
					error.response.data.details[0].message ??
					error.message,
			);
		} finally {
			set({ loading: false, todoToDelete: '' });
		}
	},
	fetchTodo: async (id: string) => {
		set({ loading: true });
		try {
			const response = await TodoService.getOneTodo(id);

			if (!(response.status == 200))
				throw new Error('Failed to get todo!');

			const todo = await response.data;

			set({ loading: false, todo: todo });
		} catch (error) {
			set({
				loading: false,
				todo: {
					id: '',
					name: '',
					description: '',
					isPrivate: false,
					isCompleted: false,
					authorEmail: '',
					createdAt: '',
					updatedAt: '',
				},
				error: error.message,
			});
			toast.error(
				error.response.data.message ??
					error.response.data.details[0].message ??
					error.message,
			);
		} finally {
			set({
				loading: false,
			});
		}
	},
	editTodo: async (todo: TodoEditType) => {
		set({ loading: true });
		try {
			const response = await TodoService.editTodo(todo);

			if (!(response.status == 200))
				throw new Error('Failed to edit todo!');

			toast.success('Todo edited');

			set({
				loading: false,
				todo: {
					id: '',
					name: '',
					description: '',
					isPrivate: false,
					isCompleted: false,
					authorEmail: '',
					createdAt: '',
					updatedAt: '',
				},
				create: !get().create,
			});
		} catch (error) {
			set({
				loading: false,
				todo: {
					id: '',
					name: '',
					description: '',
					isPrivate: false,
					isCompleted: false,
					authorEmail: '',
					createdAt: '',
					updatedAt: '',
				},
				error: error.message,
			});
			toast.error(
				error.response.data.message ??
					error.response.data.details[0].message ??
					error.message,
			);
		} finally {
			set({
				loading: false,
				todo: {
					id: '',
					name: '',
					description: '',
					isPrivate: false,
					isCompleted: false,
					authorEmail: '',
					createdAt: '',
					updatedAt: '',
				},
			});
		}
	},
	setSearch: (text: string) => {
		set({ search: text });
	},
	setComplete: () => {
		get().completed ? set({ completed: '' }) : set({ completed: 'true' });
	},
	setPrivate: () => {
		get().privatef ? set({ privatef: '' }) : set({ privatef: 'true' });
	},
	setPublic: () => {
		get().publicf ? set({ publicf: '' }) : set({ publicf: 'true' });
	},
	setPage: (page: number) => {
		set({ page });
	},
	nextSlide: () => {
		const newSlide = get().slide + 1;
		newSlide <= get().slides && set({ slide: newSlide });
	},
	complete: async (id: string) => {
		await todoService.completeTodo(id);
	},
	privatize: async (id: string) => {
		await todoService.privatizeTodo(id);
	},
	deleteT: (id: string) => {
		set({ del: true, todoToDelete: id });
	},
	deleteF: () => {
		set({ del: false });
	},
}));

export const useTodoSelectors = () => {
	const {
		todos,
		todoSlides,
		todo,
		limit,
		loading,
		del,
		error,
		todoToDelete,
		fetchTodos,
		addTodo,
		deleteT,
		deleteF,
		deleteTodo,
		fetchTodo,
		editTodo,
		search,
		setSearch,
		complete,
		privatize,
		create,
		privatef,
		completed,
		publicf,
		setComplete,
		setPrivate,
		setPublic,
		page,
		pages,
		setPage,
		slide,
		slides,
		nextSlide,
		fetchSlides,
		resetSlides,
	} = useTodoStore((state) => ({
		todos: state.todos,
		todoSlides: state.todoSlides,
		todo: state.todo,
		limit: state.limit,
		loading: state.loading,
		del: state.del,
		error: state.error,
		todoToDelete: state.todoToDelete,
		fetchTodos: state.fetchTodos,
		addTodo: state.addTodo,
		deleteT: state.deleteT,
		deleteF: state.deleteF,
		deleteTodo: state.deleteTodo,
		fetchTodo: state.fetchTodo,
		editTodo: state.editTodo,
		search: state.search,
		setSearch: state.setSearch,
		complete: state.complete,
		privatize: state.privatize,
		create: state.create,
		privatef: state.privatef,
		completed: state.completed,
		publicf: state.publicf,
		setComplete: state.setComplete,
		setPrivate: state.setPrivate,
		setPublic: state.setPublic,
		page: state.page,
		pages: state.pages,
		setPage: state.setPage,
		slide: state.slide,
		slides: state.slides,
		nextSlide: state.nextSlide,
		fetchSlides: state.fetchSlides,
		resetSlides: state.resetSlides,
	}));

	return {
		todos,
		todoSlides,
		todo,
		limit,
		loading,
		del,
		error,
		todoToDelete,
		fetchTodos,
		addTodo,
		deleteT,
		deleteF,
		deleteTodo,
		fetchTodo,
		editTodo,
		search,
		setSearch,
		complete,
		privatize,
		create,
		privatef,
		completed,
		publicf,
		setComplete,
		setPrivate,
		setPublic,
		page,
		pages,
		setPage,
		slide,
		slides,
		nextSlide,
		fetchSlides,
		resetSlides,
	};
};
