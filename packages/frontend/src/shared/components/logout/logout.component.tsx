import classNames from 'classnames';
import * as React from 'react';
import Button from '~shared/components/button/button.component';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~shared/keys';
import { useAuthSelectors } from '~store/auth.store';
import DialogC from '~shared/components/dialog/dialog.component';
import { profileStyle } from './logout.style';

const Logout = (): React.ReactNode => {
	const { logout, isLogout, logoutF, logoutT } = useAuthSelectors();

	const navigate = useNavigate();

	const handleLogout = React.useCallback(() => {
		logout();
		logoutF();
		navigate(ROUTER_KEYS.APP);
	}, [logout, logoutF, isLogout]);
	return (
		<div>
			<DialogC
				onClose={() => logoutF()}
				isOpen={isLogout}
				title="Logout"
				icon="delete"
				description="Are you sure you want to logout?"
				onClickF={() => logoutF()}
				onClickT={handleLogout}
			/>
			<Button
				extraButtonStyles={classNames(profileStyle)}
				text="Logout"
				onClick={() => logoutT()}
			/>
		</div>
	);
};

export default Logout;
