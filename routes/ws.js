import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import express from "express";

const app = express()
const webSocketServer = createServer(app);
const wss = new WebSocketServer({ server: webSocketServer });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        wss.clients.forEach((client) => {
            client.send(message.toString());
        });
    });



    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

export default webSocketServer