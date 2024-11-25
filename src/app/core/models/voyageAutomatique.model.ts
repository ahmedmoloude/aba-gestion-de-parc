export interface VoyageAutomatique {
    uuid: string;
    id: number;
    axe_id: string;
    day: string ;
    start_hour: string;
    end_hour: string;
    days_to_add: string ;
    created_at: string;
    updated_at: string;
  }
  
  export interface VoyageAutomatiqueAddForm {
    axe_id: string;
    day: string ;
    start_hour: string;
    end_hour: string;
    days_to_add: string ;
  }
  
  export interface VoyageAutomatiqueUpdateForm {
    axe_id: string;
    day: string ;
    start_hour: string;
    end_hour: string;
    days_to_add: string ;
  }
  