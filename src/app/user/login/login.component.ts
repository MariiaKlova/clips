import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  }

  constructor(
    private auth: Auth
  ) {}

  showAlert = false;
  alertMsg = 'Success!';
  alertColor = 'blue'
  inSubmission = false

  async login() {

    this.showAlert = true;
    this.alertMsg = 'Please wait!'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.credentials.email,
        this.credentials.password
      )
      this.showAlert = true;
      this.alertMsg = 'Please wait!'
      this.alertColor = 'blue'
      this.inSubmission = true
    }

    catch (e) {
      console.error(e);
      this.alertMsg = 'An unexpected error occured. Please try again later.'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Success!'
    this.alertColor = 'green'
  }
}
