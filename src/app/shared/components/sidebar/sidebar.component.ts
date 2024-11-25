import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../../../core/interface/IMenu';
import { MENU, ROUTES, USER_SlUG } from '../../../config';
import { AuthService } from './../../../core';
import { onSideNavChange, animateText } from '../../animations/animations';
import { SidenavService } from '../../../core/services/sidenav.service';
import { selectAuthUser } from 'app/core/store/profil/profil.selectors';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng-lts/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [onSideNavChange, animateText],
})
export class SidebarComponent implements OnInit {
  menuList: IMenu[];
  items: MenuItem[] = [];
  @Input() sidenavWidth;
  @Input() callapsed;
  parentName = '';

  public sideNavState: boolean = true;
  public linkText: boolean = true;

  constructor(
    public authService: AuthService,
    private _sidenavService: SidenavService,
    private store: Store<AppState>
  ) {}
  // this.menuList = MENU;

  initMenu() {
    let tempAbilities = []
    let role = null
    this.store.select(selectAuthUser).subscribe((user) => {
      tempAbilities = (user?.abilities?.length) ? user?.abilities[0]?.abilities : [];
      role = user.role ? user.role : user.temp_role
      console.log('ABILITIES', tempAbilities)
      const mapMenuItems = (
        tempAbilities: any,
        menuItems: any[],
        parent: MenuItem[] | null = this.items,
      ) => {
        menuItems
          .filter((m) => m.isMenu != false)
          .forEach((menu) => {
            const menuItem: MenuItem = {
              label: menu?.label,
              routerLink: menu?.routeName,
              icon: menu?.icon,
            };

            if(role.name.toLowerCase().includes('admin')){
              parent.push(menuItem);
                if (menu?.items?.length) {
                  menuItem.items = [];
                  mapMenuItems(tempAbilities, menu?.items, menuItem.items);
                }
            }else{
              tempAbilities.forEach(ability => {
                console.log(menu.label, ability.name,ability.children?.length)
                if(
                  (menu.label.toLowerCase().trim() == ability.name.toLowerCase().trim() && ability.abilities.includes('R')) ||
                  (menu.label.toLowerCase().trim() == ability.name.toLowerCase().trim() && ability.children && ability.children.length > 0)
                ){
                  parent.push(menuItem);
                  if (menu?.items?.length) {
                    menuItem.items = [];
                    mapMenuItems(ability.children, menu?.items, menuItem.items);
                  }
                }
              });
            }



          });
      };
      mapMenuItems(tempAbilities, MENU);
    });
  }
  ngOnInit(): void {

    // this.store.select(selectAuthUser).subscribe((user) => {
    //   const role = user?.role?.name;
    //   const abilities = (user?.abilities.length) ? user?.abilities[0].abilities : [];
    //   console.log('ABILITIES', abilities)

    //   this.menuList = MENU.filter((item: IMenu) => {
    //     return !item?.authorizedRoles || item?.authorizedRoles?.includes(role);
    //   });

    //   this.menuList = MENU.filter((item: IMenu) => {
    //     abilities.forEach(ability => {
    //       console.log(item.label, ability.name)
    //       if(item.label.toLowerCase().trim() == ability.name.toLowerCase().trim()){
    //         console.log('KITSAWAAAAAAAW')
    //       }
    //       return item.label.toLowerCase().trim() == ability.name.toLowerCase().trim()
    //     });
    //   });
    // });
    this.initMenu();
  }

  onSinenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }

  setParentName(parentName) {
    console.log('PARENT', parentName);
    this.parentName = parentName;
  }

  logout() {
    this.authService.logout();
  }
}
