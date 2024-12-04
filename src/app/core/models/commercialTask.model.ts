export interface CommercialTask {
    uuid: string;
    id: number;
    Subject :string,
    StartTime :string,
    EndTime :string,
    duration :string,
    Description :string,
    Location :string,
    IsAllDay :string,
    priority :string,
    customer_id :string,
    user_id :string,
    StatusTask :string,
    commercialTasksable_id :string,
    commercialTasksable_type :string,
    created_at: string;
    updated_at: string;
  }

  export interface CommercialTaskAddForm {
    Subject :string,
    StartTime :string,
    EndTime :string,
    duration :string,
    Description :string,
    Location :string,
    IsAllDay :string,
    priority :string,
    customer_id :string,
    user_id :string,
    StatusTask :string,
    commercialTasksable_id :string,
    commercialTasksable_type :string,
  }
  
  export interface CommercialTaskUpdateForm {
    Subject :string,
    StartTime :string,
    EndTime :string,
    duration :string,
    Description :string,
    Location :string,
    IsAllDay :string,
    priority :string,
    customer_id :string,
    user_id :string,
    StatusTask :string,
    commercialTasksable_id :string,
    commercialTasksable_type :string,
  }