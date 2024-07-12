import TodoService from '@/services/todo.service';
import { RequestWithUser } from '@/types/request.type';
import { Response, NextFunction } from 'express';

const todoService = new TodoService();

export const checkTodoOwnership = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction,
) => {
	const todo = await todoService.findById(req.params.id);
	todo?.authorEmail === req.user?.email
		? next()
		: res.status(400).json({
				message: 'The route is only available for the account owner',
			});
};
