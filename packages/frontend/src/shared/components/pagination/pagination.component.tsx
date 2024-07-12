import * as React from 'react';
import ResponsivePaginationComponent from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { useTodoSelectors } from '~store/todos.store';

const PaginationC = (): React.ReactNode => {
	const { page, pages, setPage } = useTodoSelectors();
	return (
		<ResponsivePaginationComponent
			current={page}
			total={pages}
			onPageChange={setPage}
		/>
	);
};

export default PaginationC;
