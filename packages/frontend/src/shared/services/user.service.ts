import HttpService from './http.service';
import { UserCreateType, UserLoginType } from '~typings/user.type';

class UserService extends HttpService {
	constructor() {
		super();
	}
	register(user: UserCreateType) {
		return this.post(
			{
				url: 'user/register',
				data: { ...user },
			},
			false,
		);
	}
	login(user: UserLoginType) {
		return this.post(
			{
				url: 'user/login',
				data: { ...user },
			},
			false,
		);
	}
	sendPasswordChangeRequest(email: string) {
		return this.post(
			{
				url: 'user/passwordChangeRequest',
				data: { email },
			},
			false,
		);
	}
	changePassword(password: string, token: string) {
		return this.post(
			{
				url: `user/changePassword/${token}`,
				data: { password },
			},
			false,
		);
	}
}

const userService = new UserService();
export default userService;
