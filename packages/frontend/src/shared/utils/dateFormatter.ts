type DateFormatOptions = {
	year: 'numeric' | '2-digit';
	month: 'numeric' | '2-digit';
	day: 'numeric' | '2-digit';
};

export const formatDate = (
	date: Date | string | number,
	locale = 'en-US',
	options: DateFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	},
) => {
	if (!date) return '';
	return new Date(date).toLocaleDateString(locale, options);
};
