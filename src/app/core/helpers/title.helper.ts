import { element } from 'protractor';
import { MENU, ROUTES } from '../../config';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Console } from 'console';

@Injectable({ providedIn: 'root' })
export class HeaderSetterHelper {
  private nodes: any;

  public constructor(private _title: Title, private _router: Router) {}

  public setTitleAndHeader() {
    this.setElementByRouteName();
    this.setPageTitle();
  }

  // Affecte un titre a la page courante depuis la constante MENU
  public setPageTitle() {
    if (this.nodes !== undefined && this.nodes !== null) {
      if (this.nodes.label === this.nodes.name) {
        this._title.setTitle(this.nodes.label);
      } else {
        this._title.setTitle(this.nodes.label + ' / ' + this.nodes.name);
      }
    }
  }

  // Affecte un menu breadcrumb pour une route donnée
  public setElementByRouteName() {
    const routeLink = this._router.url;
    // console.log('route link =====>', routeLink);
    for (let KEY in ROUTES) {
      // console.log('route name ===> ', ROUTES[KEY])
      // const regex = new RegExp('\^' + ROUTES[KEY]['route'] + '[\\/]?([[0-9a-zA-Z\-]*]*$)');
      //if (regex.test(routeLink)) {
      let route = null;
      if (ROUTES[KEY]['params']) {
        // let excludeElements = ROUTES[KEY]['params'] * -1;
        let spliter = routeLink.split('/');
        spliter.splice(
          spliter.length - ROUTES[KEY]['params'],
          ROUTES[KEY]['params']
        );
        route = '/' + spliter.join('');
      }
      if (ROUTES[KEY]['route'] == routeLink || ROUTES[KEY]['route'] == route) {
        this.nodes = this.getMenuItemByRouteName(ROUTES[KEY]['name']);
        return this.nodes
          ? {
              title: this.nodes.name,
              icon: this.nodes.icon_title,
              route: ROUTES[KEY]['name'],
              component: this.nodes.header_component,
              style: this.nodes.style_header,
            }
          : null;
      }
    }
  }

  public getMenuItemByRouteName(routeName: string): any {
    let menu: any = null;
    for (const item of MENU) {
      if (item['routerLink'] === routeName) {
        menu = item;
      } else {
        if (item['items']) {
          for (const element of item['items']) {
            if (element['routeName'] === routeName) {
              menu = item;
            }
          }
        }
      }
    }

    return menu;
  }
}
