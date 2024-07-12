export type Filter = {
	email: string;
	privatef: boolean | undefined;
	complete: boolean | undefined;
	publicf: boolean | undefined;
	search: string | undefined;
};

export type Pages = {
	page: string | undefined;
	offset: string | undefined;
};
