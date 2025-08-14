import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import { RegisterValidators } from '../validators/register-validators';
import IUser from '../../models/user.model'
import { EmailTaken } from '../validators/email-taken';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(
   private auth: AuthService,
   private emailTaken: EmailTaken
  ) { }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ], [(control) => this.emailTaken.validate(control)]);
  age = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(18),
    Validators.max(120),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  ]);
  confirm_password = new FormControl('', [
    Validators.required
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13),
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirm_password: this.confirm_password,
    phoneNumber: this.phoneNumber,
  }, [RegisterValidators.match('password', 'confirm_password')])

  showAlert = false;
  alertMsg = 'Success!';
  alertColor = 'blue'
  inSubmission = false

  private getUserFromForm(): IUser {
    return {
      name: this.name.value!,
      email: this.email.value!,
      age: this.age.value!, 
      password: this.password.value!,
      phoneNumber: this.phoneNumber.value!
    };
  }

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.'
    this.alertColor = 'blue'
    this.inSubmission = true
 
    try {
      await this.auth.createUser(this.getUserFromForm());
    }
    catch (e) {
      console.error(e);
      this.alertMsg = 'An unexpected error occured. Please try again later.'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    this.alertMsg = 'Success! Your accounthas been created.'
    this.alertColor = 'green'
  }

}