/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import express, { NextFunction } from 'express';
import { flashcardRouter } from './routers/flashcardRouter';
import cors from 'cors';
import { maintenanceMode } from './middleware/maintenanceMode';
import { logger, morganRouteLogger } from './middleware/logger';

// const morganRouteLogger = morgan(
// 	':method :url :status  1 :remote-addr 2 :response-time ms',
// 	{
// 		stream: {
// 			write: (message) => logger.http(message.trim()),
// 		},
// 	}
// );


export const app = express();
app.use(express.json());
app.use(cors());
app.use(maintenanceMode);
app.use(morganRouteLogger);



// declare global {
// 	namespace Express {
// 		interface Response {
// 			status: number;
// 		}
// 	}
// }

// app.use((req, res, next) => {
// 	logger.error('This is some information showing an error.');
// 	logger.warn('Here we are showing a warning.');
// 	logger.info('This is just some info.');
// 	logger.verbose('This is a very long text that has a whole bunch of information. This would be for example a dump of some information that might help in debugging, etc.');
// 	logger.debug('test = 0');
// 	next();
// });


app.get('/', (req, res) => {
	// throw new Error('root problem');
	res.json({
		appName: "API for AppLearn version 0.1"
	})
});

// app.use(logger);
app.use('/api/flashcards', flashcardRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
	console.error(err.message) // this will later be written to our logs
	res.status(500).send('We are currently experiencing technical difficulties. Try again at a later time, or call 423 23423 23 234.')
});
