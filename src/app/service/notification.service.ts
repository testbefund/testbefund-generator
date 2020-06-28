import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private zone: NgZone, private snackBar: MatSnackBar) { }

  showError(msg: string): void {
    this.zone.run(args => this.snackBar.open(msg, 'Error'));
  }

  showInfo(msg: string): void {
    this.zone.run(args => this.snackBar.open(msg, 'OK'));
  }
}
