import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { ServerOptions } from 'socket.io';
import * as jwt from 'jsonwebtoken';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext,
    private readonly jwtSecret: string,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);

    server.use((socket, next) => {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Unauthorized'));

      try {
        const payload = jwt.verify(token, this.jwtSecret) as any;
        socket.data.userId = payload.userId;
        next();
      } catch {
        next(new Error('Unauthorized'));
      }
    });

    return server;
  }
}
