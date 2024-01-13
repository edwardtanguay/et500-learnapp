import winston from 'winston';
// const { combine, timestamp, printf, colorize, align } = winston.format;
const { combine, timestamp, json } = winston.format;
import morgan from 'morgan';

// SIMPLE
// export const logger = winston.createLogger({
//   level: 'debug',
//   format: winston.format.cli(),
//   transports: [new winston.transports.Console()],
// });

// COLORED LOGS
// export const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || 'debug',
//   format: combine(
//     colorize({ all: true }),
//     timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss.SSS',
//     }),
//     align(),
//     printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
//   ),
//   transports: [new winston.transports.Console()],
// });

// LOG FILE
export const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'http',
	format: combine(timestamp(), json()),
	// transports: [
	// 	new winston.transports.File({
	// 		filename: 'combined2.log',
	// 	}),
	// ],
	transports: [
		new winston.transports.File({
			filename: 'backend/api/logs/app.log',
			level: 'http',
		}),
	],
});


export const morganRouteLogger = morgan(
	(tokens, req, res) => {
		return JSON.stringify({
			method: tokens.method(req, res),
			url: tokens.url(req, res),
			status: tokens.status(req, res),
			content_length: tokens.res(req, res, 'content-length'),
			response_time: tokens['response-time'](req, res),
			remoteAddr: req.socket.remoteAddress
		});
	},
	{
		stream: {
			write: (message) => {
				const data = JSON.parse(message);
				logger.http(`incoming-request`, data);
			},
		},
	}
);