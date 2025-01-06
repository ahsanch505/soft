import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
       schemas: [CUSTOM_ELEMENTS_SCHEMA],
              standalone: true,
              imports:[CommonModule,]
})
export class ReportComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
