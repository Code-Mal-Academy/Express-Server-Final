import { Router } from "express";

const sse = Router()

sse.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const intervalId = setInterval(() => {
        sendEvent({ message: 'Hello from the server!', timestamp: new Date().toISOString() });
    }, 1000);

    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});

export default sse