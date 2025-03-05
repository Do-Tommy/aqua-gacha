import express, { Express } from 'express';
import connectDB from './config/db';
import gachaRoutes from './routes/gacha';
import tradeRoutes from './routes/trade';
import { Server } from 'socket.io';
import http from 'http';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/gacha', gachaRoutes);
app.use('/api/trade', tradeRoutes);

// Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('tradeRequest', (data) => {
    socket.broadcast.emit('tradeNotification', data);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

// Connect to MongoDB and start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});