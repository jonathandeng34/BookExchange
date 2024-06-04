import express from 'express'
import http from 'http'
import { connect } from 'http2';
import { Server } from 'socket.io'


const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [process.env.FRONTEND_ORIGIN],
        methods: ["GET", "POST"]
    }
});

export const userSocketId = (exchange) => {
    if(!connections[exchange]) {
        return undefined;
    }
    return connections[exchange];
}

const connections = {};

//One connection per book exchange per user

io.on('connection', (socket) => {
    console.log(socket.id, 'connected');

    const exchangeId = socket.handshake.query.exchangeId;
    const userId = socket.handshake.query.userId;
    if(!connections[exchangeId]) {
        connections[exchangeId] = [];
    }
    if (key !== undefined)
    {
        connections[exchangeId][userId] = socket.id;
    }

    io.emit("users", Object.keys(connections));

    socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected');
        delete connections[exchangeId][userId];
        if(connections[exchangeId].length == 0) {
            delete connections[exchangeId];
        }
        io.emit("users", Object.keys(connections));
    });


});

export {app, io, server}