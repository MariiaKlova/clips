import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { fetchSignInMethodsForEmail } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})

export class EmailTaken implements AsyncValidator {
  constructor(private auth: Auth) {}

  validate (control: AbstractControl): Promise<ValidationErrors | null> {
    const email = (control.value ?? '').trim();

    if (!email) return Promise.resolve(null);

    return fetchSignInMethodsForEmail(this.auth, email)
      .then((methods) => methods.length ? { emailTaken: true } : null)
      .catch(() => null);
  }
}