import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export class GenericValidator {
	constructor() {}

	isBodyValid(schema: ObjectSchema) {
		return async function (
			req: Request,
			res: Response,
			next: NextFunction,
		) {
			try {
				await schema.validateAsync(req.body, { abortEarly: false });
				next();
			} catch (error) {
				res.status(404).json(error);
			}
		};
	}

	isModelObjectExistsById<
		T extends {
			findUnique: (args: {
				where: { id: string };
			}) => Promise<Required<{ id: string }> | null>;
		},
	>(model: T) {
		return async (req: Request, res: Response, next: NextFunction) => {
			try {
				const data = await model.findUnique({
					where: { id: req.params.id },
				});

				if (data) {
					return next();
				}

				res.status(404).json({ error: `Data not found` });
			} catch (error) {
				res.status(404).json(error);
			}
		};
	}
}

const validator = new GenericValidator();
export default validator;
