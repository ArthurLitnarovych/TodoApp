import { Response, Request, NextFunction } from 'express';

function TryCatch(
	target: Object,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	const originalMethod = descriptor.value;

	descriptor.value = async function (
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			await originalMethod.call(this, req, res, next);
		} catch (err) {
			let errorMessage = 'An error occurred';

			if (err instanceof Error) {
				errorMessage = err.message;
			}

			res.status(res.statusCode < 400 ? 400 : res.statusCode || 500).json(
				{
					message: errorMessage,
				},
			);
		}
	};

	return descriptor;
}

export { TryCatch };
