import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.services';
import { IsActiveMatchOptions } from '@angular/router';



@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent {

  readonly exactRoute: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'ignored',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };

  constructor(
    public modal: ModalService,
    public auth: AuthService
  ) { }

  openModal($event: Event) {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }
}