export interface RDV {
    uuid: string;
    id: number;
    Subject :string,
    StartTime :string,
    EndTime :string,
    duration :string,
    Status :string,
    Description :string,
    Location :string,
    IsAllDay :string,
    priority :string,
    customer_id :string,
    rdvable_id :string,
    rdvable_type :string,
    type :string,
    user_id :string,
    created_at: string;
    updated_at: string;
  }

  export interface RDVAddForm {
    Subject :string,
    StartTime :string,
    EndTime :string,
    duration :string,
    Status :string,
    Description :string,
    Location :string,
    IsAllDay :string,
    priority :string,
    customer_id :string,
    rdvable_id :string,
    rdvable_type :string,
    type :string,
    user_id :string,
  }
  
  export interface RDVUpdateForm {
    Subject :string,
    StartTime :string,
    EndTime :string,
    duration :string,
    Status :string,
    Description :string,
    Location :string,
    IsAllDay :string,
    priority :string,
    customer_id :string,
    rdvable_id :string,
    rdvable_type :string,
    type :string,
    user_id :string,
  }