import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent implements OnInit {

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.showInfo('Login Erfolgreich');
    this.router.navigate(['create']);
  }

}
