import classNames from 'classnames';
import * as React from 'react';

import Button from '~shared/components/button/button.component';
import TableC from '~shared/components/table/table.component';
import {
	profileContainerStyle,
	divDashboardStyle,
	profileDashboardStyle,
} from './dashboard.style';
import { useMediaQuery } from 'react-responsive';
import { useTodoSelectors } from '~store/todos.store';
import SliderC from '~shared/components/slider/slider.component';
import { DEVICE } from '~shared/styles/devices.const';
import ListC from '~shared/components/list/list.component';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS, STORAGE_KEYS } from '~shared/keys';
import SearchFilters from '~shared/components/filters-search/searchfilters.component';
import DialogC from '~shared/components/dialog/dialog.component';
import useDebounce from '~shared/utils/debouncer';
import Logout from '~shared/components/logout/logout.component';

const Dashboard = (): React.ReactNode => {
	const isDesktop = useMediaQuery({ query: DEVICE.desktop });
	const isMobile = useMediaQuery({ query: DEVICE.mobile });
	const isTablet = useMediaQuery({ query: DEVICE.tablet });

	const navigate = useNavigate();

	const {
		todoToDelete,
		deleteF,
		del,
		deleteTodo,
		resetSlides,
		completed,
		privatef,
		publicf,
		search,
		create,
	} = useTodoSelectors();

	const debouncedText = useDebounce(search, 400);

	const handleDeleteTodo = React.useCallback(() => {
		deleteTodo(todoToDelete);
		deleteF();
	}, [deleteTodo, deleteF, todoToDelete]);

	React.useEffect(() => {
		if (!STORAGE_KEYS.TOKEN) navigate(0);
		resetSlides();
	}, [debouncedText, completed, create, privatef, publicf]);

	return (
		<div className={classNames(divDashboardStyle)}>
			<DialogC
				onClose={() => deleteF()}
				isOpen={del}
				title="Delete todo"
				icon="delete"
				description="Are you sure you want to delete this todo?"
				onClickF={() => deleteF()}
				onClickT={handleDeleteTodo}
			/>
			<div className={classNames(profileContainerStyle)}>
				<Button
					onClick={() => navigate(ROUTER_KEYS.CREATE_TODO)}
					extraButtonStyles={classNames(profileDashboardStyle)}
					text="Add todo"
				/>
				<Logout />
			</div>
			<SearchFilters />

			{isDesktop && <TableC />}
			{isTablet && <SliderC />}
			{isMobile && <ListC />}
		</div>
	);
};

export default Dashboard;
