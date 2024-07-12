import React from 'react';
import { InputGroup } from '@blueprintjs/core';
import Button from '../button/button.component';
import { useTodoSelectors } from '~store/todos.store';
import classNames from 'classnames';
import {
	filterDashboardStyle,
	optionsContainerMobileStyle,
	optionsContainerStyle,
	optionsContainerTabletStyle,
} from './searchfilters.style';
import { useMediaQuery } from 'react-responsive';
import { DEVICE } from '~shared/styles/devices.const';

const SearchFilters: React.FC = ({}) => {
	const {
		search,
		setSearch,
		setComplete,
		setPrivate,
		setPublic,
		completed,
		privatef,
		publicf,
	} = useTodoSelectors();
	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};
	const isDesktop = useMediaQuery({ query: DEVICE.desktop });
	const isMobile = useMediaQuery({ query: DEVICE.mobile });
	const isTablet = useMediaQuery({ query: DEVICE.tablet });

	const divClass = classNames({
		[optionsContainerStyle]: isDesktop,
		[optionsContainerMobileStyle]: isMobile,
		[optionsContainerTabletStyle]: isTablet,
	});

	return (
		<div className={classNames(divClass)}>
			{isMobile && (
				<InputGroup
					large={true}
					placeholder="Search..."
					type="search"
					value={search}
					onChange={handleSearchChange}
				/>
			)}
			<div>
				<Button
					extraButtonStyles={classNames(filterDashboardStyle)}
					text="Public"
					disabled={!!privatef}
					pressed={!!publicf}
					onClick={() => setPublic()}
				/>
				<Button
					extraButtonStyles={classNames(filterDashboardStyle)}
					text="Private"
					disabled={!!publicf}
					pressed={!!privatef}
					onClick={() => setPrivate()}
				/>
				<Button
					extraButtonStyles={classNames(filterDashboardStyle)}
					text="Completed"
					pressed={!!completed}
					onClick={() => setComplete()}
				/>
			</div>
			{!isMobile && (
				<InputGroup
					large={true}
					placeholder="Search..."
					type="search"
					value={search}
					onChange={handleSearchChange}
				/>
			)}
		</div>
	);
};

export default SearchFilters;
