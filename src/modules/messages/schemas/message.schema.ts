import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  workspaceId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ required: true, index: 'text' })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
