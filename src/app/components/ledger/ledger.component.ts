import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss'],
     schemas: [CUSTOM_ELEMENTS_SCHEMA],
            standalone: true,
            imports:[CommonModule,]
})
export class LedgerComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
