import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import BaseRouter from './routes';
import {AppDataSource} from './data-source';
import cors from 'cors';

// Init express
const app = express();


AppDataSource.initialize().then(() => {
	console.log('Database connection established');
}).catch(error => console.log(error));

/**
 * Set basic express settings
 */



const whitelist = ['http://example1.com', 'http://example2.com', 'http://localhost:5173'];
const corsOptions = {
	origin: function (origin:any, callback:any) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	}
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Show routes details in dev output in console during development
 * else, show routes details in tiny form
 */
if (process.env.NODE_ENV === 'production') {
	app.use(morgan('tiny'));
} else {
	app.use(morgan('dev'));
}

/**
 * Helmet for basic security in production
 */
if (process.env.NODE_ENV === 'production') {
	app.use(helmet());
}

/**
 * Registering base API routes
 */
app.use('/api', BaseRouter);

/**
 * Catch API errors throughout the application
 */
app.use((req: Request, res: Response, next) => {
	const err: any = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err: any, req: Request, res: Response, next: any) => {
	console.log(err);
	if (err.status === 404) res.status(404).json({ message: 'Not found' });
	else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});

/**
 * Exporting express app instance
 */
export default app;
