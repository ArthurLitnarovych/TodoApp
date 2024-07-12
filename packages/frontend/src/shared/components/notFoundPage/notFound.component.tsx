import classNames from 'classnames';
import React, { useEffect } from 'react';
import { divStyle } from './notFound.style';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { useAuthSelectors } from '~store/auth.store';

const NotFoundPage = () => {
	const { token } = useAuthSelectors();
	const navigate = useNavigate();
	useEffect(() => {
		navigate(ROUTER_KEYS.DASHBOARD);
	}, [token]);
	return (
		<div className={classNames(divStyle)}>
			<h1>404 - page not found!</h1>
			<h2>
				<Link to={ROUTER_KEYS.APP}>Please press me</Link>
			</h2>
		</div>
	);
};

export default NotFoundPage;
