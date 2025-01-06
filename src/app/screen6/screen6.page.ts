import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InternalComponent } from '../components/internal/internal.component';

@Component({
  selector: 'app-screen6',
  templateUrl: './screen6.page.html',
  styleUrls: ['./screen6.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,InternalComponent]
})
export class Screen6Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
