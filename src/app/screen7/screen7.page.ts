import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { LedgerComponent } from '../components/ledger/ledger.component';

@Component({
  selector: 'app-screen7',
  templateUrl: './screen7.page.html',
  styleUrls: ['./screen7.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,LedgerComponent]
})
export class Screen7Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
