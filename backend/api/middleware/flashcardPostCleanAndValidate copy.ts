/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

export const flashcardPostCleanAndValidate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const errors: string[] = [];

	if (req.body.category === undefined) {
		req.body.category = '';
		errors.push('category field missing')
	} else {
		req.body.category = req.body.category.trim();
		if (req.body.category === '') {
			errors.push('category field empty')
		}
	}
	if (req.body.front === undefined) {
		req.body.front = '';
		errors.push('front field missing')
	} else {
		req.body.front = req.body.front.trim();
		if (req.body.front === '') {
			errors.push('front field empty')
		}
	}

	if (req.body.back === undefined) {
		req.body.back = '';
		errors.push('back field missing')
	} else {
		req.body.back = req.body.back.trim();
		if (req.body.back === '') {
			errors.push('back field empty')
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