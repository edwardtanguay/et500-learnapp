/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import express, { NextFunction } from 'express';
import { flashcardRouter } from './routers/flashcardrouter';
import cors from 'cors';
import { logger } from './middleware/logger';

export const app = express();
app.use(express.json());
app.use(cors());

// declare global {
// 	namespace Express {
// 		interface Response {
// 			status: number;
// 		}
// 	}
// }

// app.use((req, res, next) => {
// 	console.log('Request URL:', req.originalUrl)
// 	next()
// }, (req, res, next) => {
// 	console.log('Request Type:', req.method)
// 	next()
// })


app.get('/', (req, res) => {
	throw new Error('root problem');
	// res.json({
	// 	appName: "API for AppLearn version 0.1"
	// })
});

app.use(logger);
app.use('/api/flashcards', flashcardRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
	console.log('error caught');
	console.error(err.message)
	res.status(500).send('We are currently experiencing technical difficulties. Try again at a later time, or call 423 23423 23 234.')
})
