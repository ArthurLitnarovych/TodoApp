export type TodoType = {
	id: string;
	name: string;
	description: string;
	isPrivate: boolean;
	isCompleted: boolean;
	authorEmail: string;
	createdAt: string;
	updatedAt: string;
};

export type TodoCreateType = {
	name: string;
	description: string;
	isPrivate: boolean;
	isCompleted: boolean;
};

export type TodoEditType = {
	id: string;
	name: string;
	description: string;
	isPrivate: boolean;
	isCompleted: boolean;
};

export type TodoFilters = {
	private: string;
	complete: string;
	public: string;
	search: string;
};

export type Pages = {
	page: number;
	offset: number;
};
