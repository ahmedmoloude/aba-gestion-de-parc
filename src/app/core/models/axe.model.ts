export interface Axe {
    uuid: string;
    id: number;
    title: string;
    truck_id: number ;
    axe_id: number;
    city_id: number;
    hour_depart: string ;
    hour_arrivee: string;
    ordre: string;
    agence_id: number ;
    deptere: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface AxeAddForm {
    title: string;
    truck_id: number ;
    axe_id: number;
    city_id: number;
    hour_depart: string ;
    hour_arrivee: string;
    ordre: string;
    agence_id: number ;
    deptere: string;
  }
  
  export interface AxeUpdateForm {
    title: string;
    truck_id: number ;
    axe_id: number;
    city_id: number;
    hour_depart: string ;
    hour_arrivee: string;
    ordre: string;
    agence_id: number ;
    deptere: string;
  }
  