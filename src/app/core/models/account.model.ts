import { Environment } from './environment.model';

export interface Account {
  uuid: string;
  id: number;
  name: string;
  email: string;
  userable_type: string;
  userable_id: number;
  role: {
    id: number;
    name: string;
  } | null;
  userable: any;
  env: Environment;
  created_at: string;
  updated_at: string;
}

export interface AccountAddForm {
  name: string;
  email: string;
  password: string;
  id_role: number;
  userable_type: 'Environment';
  userable_id: number;
}

export interface AccountUpdateForm {
  name?: string;
  email?: string;
  password?: string;
  id_role?: number;
  userable_id?: number;
}
