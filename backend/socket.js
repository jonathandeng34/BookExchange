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

    const userId = socket.handshake.query.userId;
    if (userId !== undefined)
    {
        connections[userId] = socket.id;
    }

    io.emit("users", Object.keys(connections));

    socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected');
        delete connections[userId];
        io.emit("users", Object.keys(connections));
    });


});

export {app, io, server}