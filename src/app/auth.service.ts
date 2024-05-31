import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from 'firebase/auth';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { login } from './login/login-model';
import { signUp } from './signup/signup-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  canProceed = false;
  constructor(private alertController: AlertController, private router: Router, private toastController: ToastController) { }

  canActivate() {
    if (localStorage.getItem("loggedIn") == "true") {
      return true;
    }
    this.router.navigate(['login']);
    return false
  }

  setAuthentication(auth: boolean) {
    if (auth == true) {
      localStorage.setItem("loggedIn", "true");
    } else (
      localStorage.setItem("loggedIn", "false")
    )
  }
  async signup(signup: signUp) {
    if (!signup.email || !signup.password || !signup.confirmPassword) {
      this.presentAlert('ERROR', 'PLEASE FILL ALL THE FIELDS.');
      return; 
    }
    if (signup.password !== signup.confirmPassword) {
      this.presentAlert('ERROR', 'PASSWORD DOES NOT MATCH.');
      return;
    }
    if (!signup.email.includes('@')) {
      this.presentToast('EMAIL MUST CONTAIN "@" SYMBOL.', 3000);
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, signup.email, signup.password).then((userCredential) => {
      const userID = userCredential.user.uid;
      this.presentAlert('SUCCESS', 'SIGN UP SUCCESSFULLY.');
      this.router.navigate(['login']);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(error);
      if (errorMessage.includes("Error (auth/email-already-in-use)")) {
        this.presentAlert('ERROR', 'EMAIL IS ALREADY USED.');
      } else if (errorMessage.includes("Error (auth/invalid-email)")) {
        this.presentAlert('ERROR', 'EMAIL IS INVALID');
      } else if (errorMessage.includes("Password should be at least 6 characters (auth/weak-password).")) {
        this.presentToast('PASSWORD SHOULD BE AT LEAST 6 CHARACTERS', 2000);
      }
    })
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message: string, duration: number){
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }
  

  async login(login: login) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, login.email, login.password).then((userCredential) => {
      const userID = userCredential.user.uid;
      console.log(userID);
      this.presentAlert('SUCCESS', 'USER LOGIN SUCCESSFULLY.');
      this.router.navigate(['pictures']);
    }).catch((error) => {
      const errorMessage = error.message;
      console.log(error);
      if (errorMessage.includes("Error (auth/invalid-credential)")) {
        this.presentAlert('ERROR', 'INVALID EMAIL/PASSWORD');
      } else if (errorMessage.includes("Error (auth/invalid-email).")) {
        this.presentAlert('ERROR', 'INVALID EMAIL');
      }
    })
  }

}
