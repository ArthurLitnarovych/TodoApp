import * as React from 'react';
import classNames from 'classnames';

import { Dialog, DialogBody } from '@blueprintjs/core';
import { divDialogStyle, profileDashboardStyle } from './dialog.style';
import Button from '../button/button.component';

type IDialogProps = {
	onClose?: () => void;
	onClickT?: () => void;
	onClickF?: () => void;
	isOpen?: boolean;
	title?: string;
	icon?: 'delete';
	description?: string;
};

const DialogC: React.FunctionComponent<IDialogProps> = ({
	onClose,
	onClickT,
	onClickF,
	isOpen,
	title,
	icon,
	description,
}) => {
	return (
		<Dialog onClose={onClose} isOpen={isOpen} title={title} icon={icon}>
			<DialogBody>
				<div className={classNames(divDialogStyle)}>
					<p>{description}</p>
					<Button
						extraButtonStyles={classNames(profileDashboardStyle)}
						text="Yes"
						onClick={onClickT}
					/>
					<Button
						extraButtonStyles={classNames(profileDashboardStyle)}
						text="No"
						onClick={onClickF}
					/>
				</div>
			</DialogBody>
		</Dialog>
	);
};

export default DialogC;
