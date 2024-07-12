import { Application } from 'express';
import todosRouter from './api/todos.route';
import userRouter from './api/user.route';
import passport from 'passport';
import '../middlewares/auth.middleware';

class AppRouter {
	constructor(private app: Application) {}

	init(): void {
		this.app.get('/', (_req, res) => {
			res.send('API Running');
		});
		this.app.use(
			'/api/todos',
			passport.authenticate('jwt', { session: false }),
			todosRouter,
		);
		this.app.use('/api/user', userRouter);
	}
}

export default AppRouter;
