import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.services';
import IUser from '../../models/user.model'

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(
   private auth: AuthService,
  ) { }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
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
  })

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

  ngOnInit() {
    this.registerForm.setValue({
      name: 'TestUser',
      email: 'test@test.com',
      age: 20,
      password: '111qqqAAA',
      confirm_password: '111qqqAAA',
      phoneNumber: '1234567890123',
    });

  }
}