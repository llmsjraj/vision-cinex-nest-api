import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { MessagesModule } from './modules/messages/messages.module';
import { PassportModule } from '@nestjs/passport';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionHandler } from 'src/common/exception-handler/global-exception-handler';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    WorkspacesModule,
    MessagesModule,
    PassportModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionHandler,
    },
  ],
})
export class AppModule {}
