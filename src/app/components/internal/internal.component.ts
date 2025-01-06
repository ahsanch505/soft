import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
          standalone: true,
          imports:[CommonModule,HeaderComponent]
})
export class InternalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
