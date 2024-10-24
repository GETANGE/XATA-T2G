import express, { Express, Response, Request, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { setUpcronJobs } from './utils/cronJob'
import { createClient, RedisClientType } from 'redis';

dotenv.config();

const app: Express = express();

import projectRoute from "./routes/projectRoute";
import commentsRoute from "./routes/commentRoute";
import usersRoute from "./routes/userRoute";
import teamsRoute from "./routes/teamRoute";
import taskRoute from "./routes/taskRoute";
import AppError from './utils/AppError';

const port: number = parseInt(process.env.PORT as string, 10) || 7000;
const host: string = 'localhost';

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use(morgan('dev'));

// redis configuration
const redisClient: RedisClientType = createClient();

(async () => {
    // Error handling
    redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
    });

    // Ready event
    redisClient.on('ready', () => {
        console.log('Redis is ready');
    });

    try {
        // Connect to Redis
        await redisClient.connect();

        // Ping the server to check the connection
        const response = await redisClient.ping();
        console.log('Ping response:', response);
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();

app.get('/', (req:Request, res:Response) =>{
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the task management API!',
    });
})

// API routes
app.use('/api/v1/project', projectRoute);
app.use('/api/v1/auth', usersRoute);
app.use('/api/v1/teams', teamsRoute);
app.use('/api/v1/task', taskRoute);
app.use('/api/v1/comments', commentsRoute)

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

// calling the cron jobs
setUpcronJobs()
export default redisClient; 

app.listen(port, host, () => { 
    console.log(`🚀 Server running at http://${host}:${port}`);
});