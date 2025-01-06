import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ExpenseComponent } from '../components/expense/expense.component';

@Component({
  selector: 'app-screen5',
  templateUrl: './screen5.page.html',
  styleUrls: ['./screen5.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ExpenseComponent]
})
export class Screen5Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
