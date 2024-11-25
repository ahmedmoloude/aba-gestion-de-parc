import { Component, OnInit } from '@angular/core';
import { onMainContentChange } from '../../animations/animations';
import { SidenavService } from '../../../core/services/sidenav.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [onMainContentChange],
})
export class AdminComponent implements OnInit {
  // sidenavWidth = 4;
  screenWidth: number;
  callapsed = false;
  public onSideNavChange: boolean;
  constructor(private _sidenavService: SidenavService) {
    this._sidenavService.sideNavState$.subscribe((res) => {
      console.log(res);
      this.onSideNavChange = res;
    });
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit(): void {
    console.log('admin component');
  }

  toogleMinSidebar() {
    this.callapsed = !this.callapsed;
  }

  // increase() {
  // 	this.sidenavWidth = 15;
  // 	console.log('increase sidenav width');
  // }
  // decrease() {
  // 	this.sidenavWidth = 4;
  // 	console.log('decrease sidenav width');
  // }
}
