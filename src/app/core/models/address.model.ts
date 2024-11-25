export interface Position {
  type: 'Point';
  coordinates: number[];
}

export const addressType = {
  BILLING: 'BILLING',
  PICKUP: 'PICKUP',
  DELIVERY: 'DELIVERY',
  EXPEDITION: 'EXPEDITION',
};

export interface Address {
  id: number;
  uuid: string;
  adress: string;
  road: string | null;
  road_number: string | null;
  adress_details: string | null;
  zipcode: string | null;
  type: 'BILLING' | 'PICKUP' | 'DELIVERY' | 'EXPEDITION';
  position: Position;
  id_customer: number;
  city_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface AddressAddForm {
  id_customer: number;
  adress: string;
  type: 'BILLING' | 'PICKUP' | 'DELIVERY' | 'EXPEDITION';
  road: string;
  road_number: string;
  adress_details: string;
  zipcode: string;
  position: {
    long: number;
    lat: number;
  } | null;
  city_id: number;
}

export interface AddressUpdateForm {
  adress?: string;
  road?: string;
  road_number?: string;
  adress_details?: string;
  zipcode?: string;
  position?: {
    long: number;
    lat: number;
  };
  city_id?: number;
}
