import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-event-blockers]',
  standalone: false
})
export class EventBlockersDirective {

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handleEvent(event: Event) {
    event.preventDefault();
  }
}