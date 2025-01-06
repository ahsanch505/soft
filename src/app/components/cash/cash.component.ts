import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss'],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
      standalone: true,
      imports:[CommonModule]
})
export class CashComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
