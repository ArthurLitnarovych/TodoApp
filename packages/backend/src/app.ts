import express, { Express, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import AppRouter from './routes';

const port = process.env.SERVER_PORT ?? 3030;
const socketPort = process.env.SOCKET_PORT ?? 3040;
const app: Express = express();
const router = new AppRouter(app);
const server = http.createServer(app);
export const io = new Server(server, {
	cors: {
		origin: process.env.CLIENT_URL,
	},
	path: '/socket',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL }));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello Node!');
});

router.init();

try {
	app.listen(port, async () => {
		try {
			console.log(`Now listening on port ${port}`);
		} catch (error) {
			console.error(error);
		}
	});

	server.listen(socketPort, async () => {
		try {
			console.log(`Socket now listening on port 3040`);
		} catch (error) {
			console.error(error);
		}
	});
} catch (error) {
	console.log(error);
}
