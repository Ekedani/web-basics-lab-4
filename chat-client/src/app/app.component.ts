import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chat Client';

  constructor(private loginService: AuthService) {
  }

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn;
  }
}