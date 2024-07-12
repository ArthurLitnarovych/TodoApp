import * as React from 'react';
import { useAuthSelectors } from '~store/auth.store';
import PrivateRoutes from './privateRoutes/privateRoutes';
import PublicRoutes from './publicRoutes/publicRoutes';

const Router: React.FunctionComponent = () => {
	const { token } = useAuthSelectors();
	return <>{token ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default Router;
