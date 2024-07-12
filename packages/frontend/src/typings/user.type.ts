export type UserType = {
	id: string;
	name: string;
	email: string;
	password: string;
};

export type UserCreateType = {
	name: string;
	email: string;
	password: string;
};

export type UserLoginType = {
	email: string;
	password: string;
};

export type UserEmailType = {
	email: string;
};
