import { Component, OnInit } from '@angular/core';
import { Auth } from 'firebase/auth';
import { login } from './login-model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  log: login = new login();
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.auth.login(this.log);
  };

}
