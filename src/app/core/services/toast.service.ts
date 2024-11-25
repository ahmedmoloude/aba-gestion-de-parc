import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private readonly snackBar: MatSnackBar) {}

  default(message: string, duration: number = 2000, isHandset?: boolean): void {
    this.show(
      message,
      {
        duration: duration,
        panelClass: 'default-notification-overlay',
      },
      isHandset
    );
  }

  info(message: string, duration: number = 2000, isHandset?: boolean): void {
    this.show(
      message,
      {
        duration: duration,
        panelClass: 'info-notification-overlay',
      },
      isHandset
    );
  }

  success(message: string, duration: number = 2000, isHandset?: boolean): void {
    this.show(
      message,
      {
        duration: duration,
        panelClass: 'success-notification-overlay',
      },
      isHandset
    );
  }

  warn(message: string, duration: number = 2500, isHandset?: boolean): void {
    this.show(
      message,
      {
        duration: duration,
        panelClass: 'warning-notification-overlay',
      },
      isHandset
    );
  }

  error(message: string, duration: number = 3000, isHandset?: boolean): void {
    this.show(
      message,
      {
        duration: duration,
        panelClass: 'error-notification-overlay',
      },
      isHandset
    );
  }

  private show(
    message: string,
    configuration: MatSnackBarConfig,
    isHandset?: boolean
  ): void {
    // If desktop, move it to top-right
    if (!isHandset) {
      configuration.horizontalPosition = 'right';
      configuration.verticalPosition = 'top';
    }

    this.snackBar.open(message, null, configuration);
  }
}
