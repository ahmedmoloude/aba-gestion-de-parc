import { Component, OnInit, ViewChild } from '@angular/core';
import {
  HeaderSetterHelper,
  AuthService,
  DynamicContentHeaderService,
} from '../../../core';
import { DynamicHeaderHostDirective } from '../../directives';
import { MENU } from '../../../config';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectAuthUser } from 'app/core/store/profil/profil.selectors';
@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class LayoutHeaderComponent implements OnInit {
  title: any = '';
  icon_title: any = '';
  user: any = null;
  route: any = '';
  component: any = null;
  style: any = null;
  @ViewChild(DynamicHeaderHostDirective, { static: true })
  dynamicHeaderHost: DynamicHeaderHostDirective;
  constructor(
    private _header: HeaderSetterHelper,
    private _router: Router,
    public authService: AuthService,
    public dynamicHeaderService: DynamicContentHeaderService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectAuthUser).subscribe((auth) => (this.user = auth));

    this._header.setTitleAndHeader();
    this._router.events.subscribe(() => {
      this._header.setTitleAndHeader();
    });
    //this.user = this.authService.userValue;
  }

  getHeaderInfos() {
    const title_header = this._header.setElementByRouteName();
    if (
      title_header !== null &&
      !!title_header['route'] &&
      this.route != title_header['route']
    ) {
      this.title = title_header['title'];
      this.icon_title = title_header['icon'];
      this.route = title_header['route'];
      this.component = title_header['component'];
      this.style = title_header['style'];
      this.dynamicHeaderService.loadComponent(
        this.dynamicHeaderHost.viewContainerRef,
        this.component
      );
    }
  }

  ngDoCheck() {
    this.getHeaderInfos();
  }
  logout() {
    this.authService.logout();
  }
}
