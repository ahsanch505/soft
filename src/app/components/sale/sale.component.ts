import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
     schemas: [CUSTOM_ELEMENTS_SCHEMA],
        standalone: true,
        imports:[CommonModule]
})
export class SaleComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
