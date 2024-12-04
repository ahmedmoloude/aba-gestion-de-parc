export interface Service {
    uuid: string;
    id: number;
    title: string;
    title_affichage: string ;
    id_calcul_basis: string;
    taxe: string;
    id_grid: string ;
    created_at: string;
    updated_at: string;
  }
  
  export interface ServiceAddForm {
    title: string;
    title_affichage: string ;
    id_calcul_basis: string;
    taxe: string;
    id_grid: string ;
  }