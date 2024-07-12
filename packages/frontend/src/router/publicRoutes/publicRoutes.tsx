import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '~modules/app/app.module';
import Login from '~modules/auth/login/login.module';
import Email from '~modules/auth/password/email.module';
import Password from '~modules/auth/password/password.module';
import Register from '~modules/auth/register/register.module';
import NotFoundPage from '~shared/components/notFoundPage/notFound.component';
import { ROUTER_KEYS } from '~shared/keys';

const PublicRoutes: React.FunctionComponent = () => {
	return (
		<Routes>
			<Route path={ROUTER_KEYS.APP} element={<App></App>}></Route>
			<Route path={ROUTER_KEYS.LOGIN} element={<Login></Login>}></Route>
			<Route
				path={ROUTER_KEYS.REGISTER}
				element={<Register></Register>}
			></Route>
			<Route
				path={ROUTER_KEYS.PASSWORD}
				element={<Email></Email>}
			></Route>
			<Route
				path={ROUTER_KEYS.ALL_MATCH}
				element={<NotFoundPage></NotFoundPage>}
			></Route>
			<Route
				path={`${ROUTER_KEYS.PASSWORD_CHANGE}/:token`}
				element={<Password></Password>}
			></Route>
		</Routes>
	);
};

export default PublicRoutes;
