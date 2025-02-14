import { Server } from 'socket.io';
import express from 'express';

let _io: Server | undefined;

const io = {
  init: (httpServer: express.Server) => {
    _io = new Server(httpServer);
    return _io;
  },
  get: () => {
    if (!_io) {
      throw new Error('Socket.io not initialized');
    }
    return _io;
  },
};

export default io;
