import {Component} from '@angular/core';
import {AuthService} from "./auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required)
  });

  constructor(private loginService: AuthService) {
  }

  login() {
    this.loginService.login(this.loginForm.value.username);
  }
}
