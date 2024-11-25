export interface IMenu {
  isMenu: boolean;
  parentMenu: string;
  label: string;
  routeName: string;
  icon: string;
  name: string;
  role: string[];
  id_group: number;
  hasBtn: boolean;
  target: string;
  authorizedRoles?: string[];
  items: IMenuItem[];
}
export interface IMenuItem {
  isMenu: boolean;
  parentMenu: string;
  label: string;
  routeName: string;
  icon: string;
  name: string;
  role: string[];
  id_group: number;
  hasBtn: boolean;
  target: string;
}
