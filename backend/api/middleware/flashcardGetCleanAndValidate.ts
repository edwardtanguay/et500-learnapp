/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { isValidSuuid } from '../handlers/dbtools';

export const flashcardGetCleanAndValidate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const errors: string[] = [];

	const suuid = req.params.suuid;

	if (suuid.length !== 6) {
		errors.push('suuid must be six characters long')
	} else {
		if (!isValidSuuid(suuid)) {
			errors.push('suuid contains invalid characters')
		}
	}

	if (errors.length > 0) {
		res.status(400).json({
			message: "invalid fields",
			errors
		});
	} else {
		next();
	}
}