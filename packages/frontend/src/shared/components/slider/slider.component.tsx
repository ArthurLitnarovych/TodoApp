import * as React from 'react';

import { Spinner } from '@blueprintjs/core';
import classNames from 'classnames';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { SPACES } from '~shared/styles/spaces.const';
import { divSliderStyle, loaderStyle, sliderStyle } from './slider.style';
import { useTodoSelectors } from '~store/todos.store';
import CardC from '../todo-card/todo.component';

const SliderC = (): React.ReactNode => {
	const { todoSlides, loading, nextSlide, slide, slides, fetchSlides } =
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
		slide < slides && fetchSlides();
	};

	return (
		<div className={classNames(divSliderStyle)}>
			<Swiper
				breakpoints={{
					630: {
						slidesPerView: todoSlides.length > 1 ? 2 : 1,
						spaceBetween: SPACES.sm,
					},
				}}
				freeMode={true}
				pagination={{
					clickable: true,
					dynamicBullets: true,
				}}
				modules={[FreeMode, Pagination]}
				className={classNames(sliderStyle)}
				onReachEnd={handleLoadMore}
			>
				{todoSlides.map((item) => (
					<SwiperSlide key={item?.id}>
						<CardC item={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SliderC;
