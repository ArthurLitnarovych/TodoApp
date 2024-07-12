import classNames from 'classnames';
import * as React from 'react';
import {
	divButtonStyle,
	divSlideStyle,
	h1Style,
	pStyle,
	tableButton,
	viewButton,
} from './todo.style';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '~shared/utils/dateFormatter';
import SwitchC from '../switches/switches.component';
import Button from '../button/button.component';
import { ROUTER_KEYS } from '~shared/keys';
import { TodoType } from '~typings/todo.type';
import { useTodoSelectors } from '~store/todos.store';
import { useAuthSelectors } from '~store/auth.store';
import { truncateText } from '~shared/utils/truncate';

const CardC = ({ item }: { item: TodoType }): React.ReactNode => {
	const { deleteT } = useTodoSelectors();
	const { email } = useAuthSelectors();

	const navigate = useNavigate();

	return (
		<>
			<div className={classNames(divSlideStyle)} key={item?.id}>
				<h1 className={classNames(h1Style)}>
					{truncateText(item?.name, 10)}
				</h1>
				<p className={classNames(pStyle)}>
					Description: {truncateText(item?.description, 10)}
				</p>
				<p className={classNames(pStyle)}>
					Last update: {formatDate(item?.updatedAt)}
				</p>
				{email === item?.authorEmail && <SwitchC todo={item} />}
				<div className={classNames(divButtonStyle)}>
					<div>
						<div className={classNames(viewButton)}>
							<Button
								extraButtonStyles={classNames(tableButton)}
								text={'View'}
								onClick={() =>
									navigate(
										`${ROUTER_KEYS.VIEW_TODO}/${item?.id}`,
									)
								}
							/>

							{email === item?.authorEmail && (
								<>
									<Button
										extraButtonStyles={classNames(
											tableButton,
										)}
										text={'Edit'}
										onClick={() =>
											navigate(
												`${ROUTER_KEYS.EDIT_TODO}/${item?.id}`,
											)
										}
									/>
									<Button
										extraButtonStyles={classNames(
											tableButton,
										)}
										text={'Delete'}
										onClick={() => deleteT(item?.id)}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CardC;
