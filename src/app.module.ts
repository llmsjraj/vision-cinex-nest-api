import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { MessagesModule } from './modules/messages/messages.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    WorkspacesModule,
    MessagesModule,
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key', // Change this to your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
