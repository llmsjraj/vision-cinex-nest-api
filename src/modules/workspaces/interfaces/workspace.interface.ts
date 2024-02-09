import { Message } from 'src/modules/messages/interfaces/message.interface';

export interface Workspace {
  _id: string;
  userId: string;
  name: string;
  messages: Message[];
}
