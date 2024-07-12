import classNames from 'classnames';
import * as React from 'react';
import Button from '~shared/components/button/button.component';
import { useTodoSelectors } from '~store/todos.store';
import { useNavigate, useParams } from 'react-router-dom';
import ViewTodoC from '~shared/components/todo-view/viewTodo.component';
import {
	buttonDesktopStyle,
	buttonMobileStyle,
	divDesktopViewStyle,
	divMobileViewStyle,
	divStyle,
	profileContainerMobileStyle,
	profileContainerStyle,
	profileViewMobileStyle,
	wrapStyle,
} from './viewTodo.style';
import { useMediaQuery } from 'react-responsive';
import { DEVICE } from '~shared/styles/devices.const';
import { ROUTER_KEYS } from '~shared/keys';
import Logout from '~shared/components/logout/logout.component';

const ViewTodo = (): React.ReactNode => {
	const { fetchTodo } = useTodoSelectors();

	const isDesktop = useMediaQuery({ query: DEVICE.desktop });
	const isTablet = useMediaQuery({ query: DEVICE.tablet });
	const isMobile = useMediaQuery({ query: DEVICE.mobile });

	const navigate = useNavigate();

	const { id } = useParams();

	React.useEffect(() => {
		fetchTodo(id);
	}, [fetchTodo]);

	return (
		<div className={classNames(wrapStyle)}>
			<div
				className={classNames(
					isMobile
						? profileContainerMobileStyle
						: profileContainerStyle,
				)}
			>
				{isMobile && (
					<Button
						extraButtonStyles={classNames(profileViewMobileStyle)}
						text="Todo list"
						onClick={() => navigate(ROUTER_KEYS.DASHBOARD)}
					/>
				)}
				<Logout />
			</div>
			<div className={classNames(divStyle)}>
				{(isDesktop || isTablet) && (
					<div className={classNames(divDesktopViewStyle)}>
						<ViewTodoC
							buttonStyles={classNames(buttonDesktopStyle)}
						/>
					</div>
				)}
				{isMobile && (
					<div className={classNames(divMobileViewStyle)}>
						<ViewTodoC
							buttonStyles={classNames(buttonMobileStyle)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ViewTodo;
