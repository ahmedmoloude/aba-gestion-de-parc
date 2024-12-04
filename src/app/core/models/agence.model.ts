export interface Agence {
    uuid: string;
    id: number;
    name: string;
    logo_path: string ;
    code_agency: string;
    is_virtuelle: string;
    hub_id: string ;
    city_id: string;
    sector_id: string;
    adress: number ;
    has_agency_delivery: string;
    has_home_delivery: string;
    position: string;
    is_hub: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface AgenceAddForm {
    name: string;
    logo_path: string ;
    code_agency: string;
    is_virtuelle: string;
    hub_id: string ;
    city_id: string;
    sector_id: string;
    adress: number ;
    has_agency_delivery: string;
    has_home_delivery: string;
    position: string;
    is_hub: string;
  }
  
  export interface AgenceUpdateForm {
    name: string;
    logo_path: string ;
    code_agency: string;
    is_virtuelle: string;
    hub_id: string ;
    city_id: string;
    sector_id: string;
    adress: number ;
    has_agency_delivery: string;
    has_home_delivery: string;
    position: string;
    is_hub: string;
  }
  