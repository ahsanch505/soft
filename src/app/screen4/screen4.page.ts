import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { SaleComponent } from '../components/sale/sale.component';

@Component({
  selector: 'app-screen4',
  templateUrl: './screen4.page.html',
  styleUrls: ['./screen4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,SaleComponent]
})
export class Screen4Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
