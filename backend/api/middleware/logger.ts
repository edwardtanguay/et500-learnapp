import winston from 'winston';
// const { combine, timestamp, printf, colorize, align } = winston.format;
const { combine, timestamp, json } = winston.format;

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
			filename: 'app.log',
			level: 'http',
		}),
	],
});
