import express from 'express'
import http from 'http'
import { Server } from 'socket.io'


const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});

export const userSocketId = (user) => {
    return connections[user];
}

const connections = {};

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