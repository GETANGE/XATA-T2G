import express, { Express, Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serveStatic from 'serve-static';
import morgan from 'morgan';

dotenv.config();

const app: Express = express();

import postRoute from "./routes/postRoute";
import AppError from './utils/AppError';

const port: number = parseInt(process.env.PORT as string, 10) || 7000;
const host: string = 'localhost';

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

// Serve all static files from the 'public' directory
app.use(serveStatic('public', { 
    index: ['html/landing.html', 'html/landing.htm'] 
}));

// API routes
app.use('/api/v1/post', postRoute);

// Catch-all route for undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new AppError(`This route ${req.method} ${req.originalUrl} is not yet defined`, 401));
});

// Global error handler
interface error extends ErrorRequestHandler {
    statusCode: number;
    status: string;
    message: string;
}

app.use((err: error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';

    res.status(statusCode).json({
        status: status,
        message: err.message || 'Internal Server Error',
    });
});

app.listen(port, host, () => { 
    console.log(`🚀 Server running at http://${host}:${port}`);
});