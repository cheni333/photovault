import { Component, OnInit } from '@angular/core';
import { signUp } from './signup-model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  sign: signUp = new signUp();
  constructor(private auth: AuthService) { }

  ngOnInit() {

  }

  async signUp() {
    await this.auth.signup(this.sign)
  }

}
