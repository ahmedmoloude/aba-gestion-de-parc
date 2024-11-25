export interface Contact {
    uuid: string;
    id: number;
    first_name: string;
    last_name: string ;
    office_phone: string;
    job_title: string;
    phone: string ;
    departement: string;
    fax: string;
    customer_id: number ;
    email: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ContactAddForm {
    first_name: string;
    last_name: string ;
    office_phone: string;
    job_title: string;
    phone: string ;
    departement: string;
    fax: string;
    customer_id: number ;
    email: string;
  }
  
  export interface ContactUpdateForm {
    first_name: string;
    last_name: string ;
    office_phone: string;
    job_title: string;
    phone: string ;
    departement: string;
    fax: string;
    customer_id: number ;
    email: string;
  }
  