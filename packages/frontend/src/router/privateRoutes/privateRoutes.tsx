import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CreateTodo from '~modules/todos/create/createTodo.module';
import Dashboard from '~modules/todos/dashboard.module';
import EditTodo from '~modules/todos/edit/editTodo.module';
import ViewTodo from '~modules/todos/view/viewTodo.module';
import NotFoundPage from '~shared/components/notFoundPage/notFound.component';
import { ROUTER_KEYS } from '~shared/keys';

const PrivateRoutes: React.FunctionComponent = () => {
	return (
		<Routes>
			<Route
				path={ROUTER_KEYS.APP}
				element={<Navigate to={ROUTER_KEYS.DASHBOARD} />}
			></Route>
			<Route
				path={ROUTER_KEYS.DASHBOARD}
				element={<Dashboard></Dashboard>}
			></Route>
			<Route
				path={ROUTER_KEYS.CREATE_TODO}
				element={<CreateTodo></CreateTodo>}
			></Route>
			<Route
				path={`${ROUTER_KEYS.VIEW_TODO}/:id`}
				element={<ViewTodo></ViewTodo>}
			></Route>
			<Route
				path={`${ROUTER_KEYS.EDIT_TODO}/:id`}
				element={<EditTodo></EditTodo>}
			></Route>
			<Route
				path={ROUTER_KEYS.ALL_MATCH}
				element={<NotFoundPage></NotFoundPage>}
			></Route>
			<Route
				path={ROUTER_KEYS.REGISTER}
				element={<Navigate to={ROUTER_KEYS.DASHBOARD} />}
			></Route>
		</Routes>
	);
};

export default PrivateRoutes;
