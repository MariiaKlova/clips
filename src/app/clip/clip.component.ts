import { Component } from '@angular/core'; 
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-clip',
  standalone: false,
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css'
})

export class ClipComponent {
  id = ''
  constructor(public route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
  })
  }
}
