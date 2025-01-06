import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
        standalone: true,
        imports:[CommonModule]
})
export class ExpenseComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
