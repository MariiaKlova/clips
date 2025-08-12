import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() modalID = ''

  constructor(
    public modal: ModalService,
    public el: ElementRef
  ) {
  }

  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.body.appendChild(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.removeChild(this.el.nativeElement)
    }
  }

  closeModal() {
    this.modal.toggleModal(this.modalID);
  }


}
