import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.services';
import { Auth, signOut } from '@angular/fire/auth';


@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(
    public modal: ModalService,
    public auth: AuthService,
    private afAuth: Auth
  ) { }

  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }

  async logout($event: Event) {
    $event.preventDefault();
    await signOut(this.afAuth)
  }
}
