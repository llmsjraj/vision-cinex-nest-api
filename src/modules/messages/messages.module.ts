import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';
import { Message, MessageSchema } from './schemas/message.schema';
import { AuthMiddleware } from 'src/common/middlewares/auth.middleware';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UsersModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('messages');
  }
}
