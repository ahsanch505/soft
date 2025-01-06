import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ReportComponent } from '../components/report/report.component';

@Component({
  selector: 'app-screen8',
  templateUrl: './screen8.page.html',
  styleUrls: ['./screen8.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ReportComponent]
})
export class Screen8Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
