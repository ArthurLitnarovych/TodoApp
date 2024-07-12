import * as React from 'react';
import classNames from 'classnames';
import Button from '~shared/components/button/button.component';
import { Link, useNavigate } from 'react-router-dom';
import { divStyle, btnStyleApp, h1App } from './app.style';
import { ROUTER_KEYS } from '~shared/keys';

const App = (): React.ReactNode => {
	const navigate = useNavigate();

	return (
		<div className={classNames(divStyle)}>
			<h1 className={classNames(h1App)}>Todo project</h1>
			<Button
				extraButtonStyles={classNames(btnStyleApp)}
				onClick={() => navigate('login')}
				text="Login"
			/>
			<Button
				extraButtonStyles={classNames(btnStyleApp)}
				onClick={() => navigate('register')}
				text="Register"
			/>
			<Link to={ROUTER_KEYS.PASSWORD}>Forgot password?</Link>
		</div>
	);
};

export default App;
