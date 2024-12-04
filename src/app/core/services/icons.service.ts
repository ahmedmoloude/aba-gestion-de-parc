import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Icons } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  registerIcons() {
    this.load(Icons, 'assets/icons');
  }

  private load(icons: typeof Icons, url: string): void {
    Object.keys(icons).forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(`${url}/${icon}.svg`)
      );
    });
  }
}
