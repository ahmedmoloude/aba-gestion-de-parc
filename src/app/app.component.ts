import { Component } from '@angular/core';
import { IconsService } from './core/services';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class AppComponent {
  title = 'sdtm-fo';

  constructor(private iconsService: IconsService) {
    this.iconsService.registerIcons();
  }
}
