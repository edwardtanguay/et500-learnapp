import express from 'express';

export const logger = (req:express.Request, res:express.Response, next:express.NextFunction) => {
	console.log('2222passed through here');
	next();
}