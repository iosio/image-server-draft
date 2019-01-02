import WebSocket from 'ws';
import express from 'express';
import {createServer} from 'http';

import {router} from "./webSocketServer/router";
import {saveFile, saveImage} from "./controllers";

//express stuff
let app = express();
let server = createServer(app);
let port = process.env.PORT || 4000;


app.use('/images', express.static('_artifacts/images'));

const routes = {
    saveFile,
    saveImage
};

const wss = new WebSocket.Server({server});

server.listen(port, () => {

    console.log('Server listening at port %d', port);

    wss.on('connection', (socket) => {

        console.log('socket connected');

        socket.on('message', (message) => {

            console.log('\n message received in wssRouter');

            router(socket, routes, message);


        });

        socket.on('close', () => {

            console.log('socket disconnected');
        })

    });
});

