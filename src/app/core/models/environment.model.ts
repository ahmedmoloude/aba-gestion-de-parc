export interface Environment {
  uuid: string;
  id: number;
  name: string;
  image: string | null;
  admin_env_id: string;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentAddForm {
  name: string;
  image?: any;
}

export interface EnvironmentUpdateForm {
  name?: string;
  image?: any;
}
