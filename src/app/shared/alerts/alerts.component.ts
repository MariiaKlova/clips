import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerts',
  standalone: false,
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
  @Input() color: string = 'blue';

  get bgColor(){
    return `bg-${this.color}-400`
  }
}
