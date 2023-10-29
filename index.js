// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.get('/admin', (req, res) => {
    io.emit('message', { username: 'Admin', message: 'Important message from the admin!', special: true });
    res.send('Message sent from admin!');
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
