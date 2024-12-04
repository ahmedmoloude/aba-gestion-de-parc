import { Message } from "./message.model";

export interface Task {
  uuid: string;
  id: number;
  description: string;
  status: string;
  complaint: any,
  assigned_user: number | null,
  messages: Message[];
  complaint_id: string;
  created_at: string;
  updated_at: string;
}


export interface TaskAddForm {
  description: string;
  status?: string;
  id_complaint: any,
  assigned_user: number | null,
}

export interface TaskUpdateForm {
  status?: string;
  assigned_user?: string;
  description?: string;
  id_complaint?: any,
}
