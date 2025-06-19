import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './common/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jwtSecret = process.env.JWT_SECRET as string;

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://api-chat-app-production-14a5.up.railway.app',
      'https://chat-omega-vert-53.vercel.app',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.setGlobalPrefix('api/v1');
  app.useWebSocketAdapter(new SocketIoAdapter(app, jwtSecret));

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
