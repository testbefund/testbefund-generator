import {Component, OnInit} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'testbefund-generator';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  openTestbefund(): void {
    window.open('https://www.testbefund.de/', '_blank');
  }
}
