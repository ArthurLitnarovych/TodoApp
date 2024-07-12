import * as React from 'react';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import {
	Body,
	Header,
	HeaderCell,
	HeaderRow,
	Row,
	Table,
} from '@table-library/react-table-library';
import {
	THEME,
	divTableStyle,
	loaderStyle,
	paginationStyle,
} from './table.style';
import { Spinner } from '@blueprintjs/core';
import classNames from 'classnames';
import { useTodoSelectors } from '~store/todos.store';
import PaginationC from '../pagination/pagination.component';
import TodoRow from './todoRow.component';
import useDebounce from '~shared/utils/debouncer';

const TableC = (): React.ReactNode => {
	const theme = useTheme([getTheme(), THEME]);

	const {
		fetchTodos,
		todos,
		loading,
		limit,
		create,
		completed,
		privatef,
		publicf,
		page,
		setPage,
		search,
	} = useTodoSelectors();

	const debouncedText = useDebounce(search, 400);

	const tableRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		setPage(1);
	}, [debouncedText, completed, privatef, publicf]);

	React.useEffect(() => {
		if (tableRef.current) {
			tableRef.current.scrollTo(0, 0);
		}
	}, [debouncedText, completed, privatef, publicf, page]);

	React.useEffect(() => {
		fetchTodos();
	}, [fetchTodos, debouncedText, create, completed, privatef, publicf, page]);

	const tableData = React.useMemo(() => {
		return {
			nodes:
				todos.length < 10
					? [
							...todos,
							...Array.from(
								{
									length: limit - todos.length,
								},
								() => ({
									id: Math.random().toString(36).substr(2, 9),
									name: '',
									description: '',
									isPrivate: '',
									isCompleted: '',
									updatedAt: '',
								}),
							),
						]
					: todos,
		};
	}, [todos, limit]);

	if (loading && todos.length == 0) {
		return (
			<div className={classNames(loaderStyle)}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className={classNames(divTableStyle)}>
			<Table
				data={tableData}
				theme={theme}
				layout={{ custom: true, fixedHeader: true }}
				ref={tableRef}
			>
				{(tableList) => (
					<>
						<Header>
							<HeaderRow>
								<HeaderCell>Task</HeaderCell>
								<HeaderCell>Description</HeaderCell>
								<HeaderCell>Completed</HeaderCell>
								<HeaderCell>Last Update</HeaderCell>
								<HeaderCell>Actions</HeaderCell>
							</HeaderRow>
						</Header>

						<Body>
							{tableList.map((item) => (
								<Row key={item?.id} item={item}>
									<TodoRow item={item} />
								</Row>
							))}
						</Body>
					</>
				)}
			</Table>
			<div className={classNames(paginationStyle)}>
				<PaginationC />
			</div>
		</div>
	);
};

export default TableC;
