import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    standalone: true,
    imports:[CommonModule,]
})
export class HeaderComponent  implements OnInit {
  dropdowns = {
    invoices: false,
    reports: false
  };

  toggleDropdown(dropdownName: 'invoices' | 'reports'): void {

    Object.keys(this.dropdowns).forEach(key => {
      if (key !== dropdownName) {
        this.dropdowns[key as keyof typeof this.dropdowns] = false;
      }
    });

    this.dropdowns[dropdownName] = !this.dropdowns[dropdownName];
  }

  constructor() { }

  ngOnInit() {}

}
