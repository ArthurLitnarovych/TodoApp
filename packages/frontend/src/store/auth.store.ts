import { toast } from 'react-toastify';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import userService from '~shared/services/user.service';
import { UserCreateType, UserLoginType } from '~typings/user.type';

type State = {
	token: string;
	email: string;
	isLogout: boolean;
	registered: boolean;
};

type Actions = {
	register: (user: UserCreateType) => Promise<void>;
	login: (user: UserLoginType) => Promise<void>;
	logout: () => void;
	logoutT: () => void;
	logoutF: () => void;
	setToken: (token: string) => void;
	clearToken: () => void;
	setEmail: (email: string) => void;
	clearEmail: () => void;
	sendPasswordChange: (email: string) => Promise<void>;
	changePassword: (password: string, token: string) => Promise<void>;
};

const useAuthStore = create(
	persist<Partial<State & Actions>>(
		(set, get) => ({
			token: '',
			email: '',
			isLogout: false,
			registered: true,
			register: async (user: UserCreateType) => {
				try {
					const response = await userService.register(user);

					if (!(response.status == 200))
						throw new Error('Failed to sent email!');

					toast.success('Verification letter was sent to your email');
					toast.info("Please don't close the window");

					set({ email: user.email, registered: false });
				} catch (error) {
					set({ email: '', token: '' });
					localStorage.removeItem('auth-storage');
					toast.error(
						error.response.data.message ??
							error.response.data.details[0].message ??
							error.message,
					);
				}
			},
			login: async (user: UserLoginType) => {
				try {
					const response = await userService.login(user);

					if (!(response.status == 200))
						throw new Error('Failed to login!');

					const data = await response.data;
					set({ email: user.email, token: data.token });
				} catch (error) {
					set({ email: '', token: '' });
					localStorage.removeItem('auth-storage');
					toast.error(
						error.response.data.message ??
							error.response.data.details[0].message ??
							error.message,
					);
				}
			},
			logout: () => {
				set({ email: '', token: '' });
				localStorage.removeItem('auth-storage');
				toast.success('Logout success');
			},
			logoutT: () => {
				set({ isLogout: true });
			},
			logoutF: () => {
				set({ isLogout: false });
			},
			setToken: (token: string) => set({ token }),
			clearToken: () => set({ token: '' }),
			setEmail: (email: string) => set({ email }),
			clearEmail: () => set({ email: '' }),
			sendPasswordChange: async (email: string) => {
				try {
					const response =
						await userService.sendPasswordChangeRequest(email);

					if (!(response.status == 200))
						throw new Error('Failed to send mail!');

					toast.success(
						'Password change request was sent to your email',
					);
				} catch (error) {
					set({ email: '', token: '' });
					localStorage.removeItem('auth-storage');
					toast.error(
						error.response.data.message ??
							error.response.data.details[0].message ??
							error.message,
					);
				}
			},
			changePassword: async (password: string, token: string) => {
				try {
					const response = await userService.changePassword(
						password,
						token,
					);

					if (!(response.status == 200))
						throw new Error('Failed to send mail!');

					toast.success('Password changed');
				} catch (error) {
					set({ email: '', token: '' });
					localStorage.removeItem('auth-storage');
					toast.error(
						error.response.data.message ??
							error.response.data.details[0].message ??
							error.message,
					);
				}
			},
		}),
		{
			name: 'auth-storage',
			partialize: (state) => ({ token: state.token, email: state.email }),
		},
	),
);

export const useAuthSelectors = () => {
	const {
		token,
		email,
		isLogout,
		register,
		login,
		logout,
		logoutT,
		logoutF,
		setToken,
		clearToken,
		setEmail,
		clearEmail,
		sendPasswordChange,
		changePassword,
		registered,
	} = useAuthStore((state) => ({
		token: state.token,
		email: state.email,
		isLogout: state.isLogout,
		register: state.register,
		login: state.login,
		logout: state.logout,
		logoutT: state.logoutT,
		logoutF: state.logoutF,
		setToken: state.setToken,
		clearToken: state.clearToken,
		setEmail: state.setEmail,
		clearEmail: state.clearEmail,
		sendPasswordChange: state.sendPasswordChange,
		changePassword: state.changePassword,
		registered: state.registered,
	}));

	return {
		token,
		email,
		isLogout,
		register,
		login,
		logout,
		logoutT,
		logoutF,
		setToken,
		clearToken,
		setEmail,
		clearEmail,
		sendPasswordChange,
		changePassword,
		registered,
	};
};
