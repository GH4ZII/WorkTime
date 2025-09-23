import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://192.168.10.128:3000',
      'http://192.168.10.128:3001',
      'http://10.129.48.163:3000',
      'http://10.129.48.163:3001',
      'http://10.229.18.144:3000',
      'http://10.229.18.144:3001',
      'exp://192.168.10.128:8081',
      'exp://192.168.10.128:19000'
    ],
    credentials: true,
  });
  
  // Enable cookie parser
  app.use(cookieParser());
  
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
}
bootstrap();
