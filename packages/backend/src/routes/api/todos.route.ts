import { Router } from 'express';

import todoController from '../../controllers/todo.controller';
import validator from '@/utils/validation/generic.validator';
import validationSchemas from '@/utils/validation/validation.schemas';
import { PrismaClient } from '@prisma/client';
import { checkTodoOwnership } from '@/middlewares/isOwner.middleware';

const prisma = new PrismaClient();

const todosRouter: Router = Router();

todosRouter.post(
	'/create',
	validator.isBodyValid.bind(validator)(validationSchemas.todos),
	todoController.createTodo.bind(todoController),
);

todosRouter.get('/all', todoController.getAllTodo.bind(todoController));
todosRouter.get(
	'/complete/:id',
	validator.isModelObjectExistsById.bind(todoController)(prisma.todo),
	checkTodoOwnership,
	todoController.completeTodo.bind(todoController),
);
todosRouter.get(
	'/privatize/:id',
	validator.isModelObjectExistsById.bind(todoController)(prisma.todo),
	checkTodoOwnership,
	todoController.privatizeTodo.bind(todoController),
);
todosRouter.get(
	'/one/:id',
	validator.isModelObjectExistsById.bind(todoController)(prisma.todo),
	todoController.getOneTodo.bind(todoController),
);

todosRouter.put(
	'/edit/:id',
	validator.isBodyValid.bind(validator)(validationSchemas.todos),
	validator.isModelObjectExistsById.bind(todoController)(prisma.todo),
	checkTodoOwnership,
	todoController.editTodo.bind(todoController),
);

todosRouter.delete(
	'/delete/:id',
	validator.isModelObjectExistsById.bind(todoController)(prisma.todo),
	checkTodoOwnership,
	todoController.deleteTodo.bind(todoController),
);

export default todosRouter;
