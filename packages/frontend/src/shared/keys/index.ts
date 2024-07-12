export const enum ROUTER_KEYS {
	ALL_MATCH = '/*',
	APP = '/',
	LOGIN = '/login',
	REGISTER = '/register',
	PASSWORD = '/password',
	PASSWORD_CHANGE = '/changePassword',
	DASHBOARD = '/dashboard',
	CREATE_TODO = '/createTodo',
	EDIT_TODO = '/editTodo',
	VIEW_TODO = '/viewTodo',
}

const data = JSON.parse(localStorage.getItem('auth-storage'));
const token = data?.state?.token;

export const STORAGE_KEYS = Object.freeze({
	TOKEN: token,
});
