import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    WorkspacesModule,
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
