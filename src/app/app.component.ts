import { Component } from '@angular/core';
import { AuthService } from './services/auth.services'
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public auth: AuthService){}
}
