import * as React from 'react';

import { Spinner } from '@blueprintjs/core';
import classNames from 'classnames';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { divSliderStyle, loaderStyle } from './list.style';
import { useTodoSelectors } from '~store/todos.store';
import CardC from '../todo-card/todo.component';
import InfiniteScroll from 'react-infinite-scroll-component';

const ListC = (): React.ReactNode => {
	const { todoSlides, loading, slide, slides, nextSlide, fetchSlides } =
		useTodoSelectors();

	if (loading && todoSlides.length == 0) {
		return (
			<div className={classNames(loaderStyle)}>
				<Spinner />
			</div>
		);
	}

	const handleLoadMore = () => {
		nextSlide();
		fetchSlides();
	};

	return (
		<InfiniteScroll
			className={classNames(divSliderStyle)}
			hasMore={slide < slides}
			loader={<Spinner />}
			dataLength={todoSlides.length}
			next={handleLoadMore}
		>
			{todoSlides.map((item) => (
				<CardC key={item?.id} item={item} />
			))}
		</InfiniteScroll>
	);
};

export default ListC;
