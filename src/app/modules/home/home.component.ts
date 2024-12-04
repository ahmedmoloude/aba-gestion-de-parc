import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user = null;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.userValue;
    console.log('home component', this.authService.userValue);
  }

  logout() {
    this.authService.logout();
  }
}
