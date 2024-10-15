import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serveStatic from 'serve-static'

dotenv.config();

const app: Express = express();

const port: number = parseInt(process.env.PORT as string, 10) || 7000;
const host: string = 'localhost';

app.use(express.json());

app.use(cors());

app.use(serveStatic('public/html', { 
    index: ['landing.html', 'landing.htm'] 
}))

app.listen(port, host, () => { 
    console.log(`🚀 Server running at http://${host}:${port}`);
});