import { User } from './user.model';
export class Message {
  uuid: string;
  id: string;
  message: string;
  user: User = null;
  is_interne: boolean;
  created_at: string;
  updated_at: string;

  constructor(message: any = null) {
    if (message) {
      this.uuid = message.uuid;
      this.id = message.id;
      this.message = message.message;
      this.is_interne = message.is_interne;
      this.created_at = message.created_at;
      this.updated_at = message.updated_at;
      if (message.user) this.user = new User(message.user);
    }
  }
}
