import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gird',
  templateUrl: './gird.component.html',
  styleUrls: ['./gird.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class GirdComponent {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  searchTerm: string = '';
  constructor(private modalController: ModalController) {
    this.loadCustomers();
  }
  loadCustomers() {
    const storedCustomers = localStorage.getItem('customers');
    this.customers = storedCustomers ? JSON.parse(storedCustomers) : [];
    this.filteredCustomers = [...this.customers]; 
  }
  saveCustomers() {
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }
  filterCustomers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomers = this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(term)
    );
  }

  async openCustomerModal(customer: any = null) {
    const modal = await this.modalController.create({
      component: CustomerFormModal,
      componentProps: {
        customerData: customer,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        if (customer) {
          const index = this.customers.findIndex((c) => c === customer);
          if (index !== -1) {
            this.customers[index] = result.data;
          }
        } else {
          this.customers.push(result.data);
        }
        this.saveCustomers(); 
        this.filterCustomers(); 
      }
    });

    await modal.present();
  }

  deleteCustomer(customer: any) {
    this.customers = this.customers.filter((c) => c !== customer);
    this.saveCustomers(); 
    this.filterCustomers();
  }
}

@Component({
  selector: 'app-customer-form-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Customer</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeModal()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Customer Name</ion-label>
          <ion-input [(ngModel)]="customer.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Shop Name</ion-label>
          <ion-input [(ngModel)]="customer.shopName"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Mobile No.</ion-label>
          <ion-input [(ngModel)]="customer.mobileNo"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Tax No.</ion-label>
          <ion-input [(ngModel)]="customer.taxNo"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Address</ion-label>
          <ion-input [(ngModel)]="customer.address"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">City</ion-label>
          <ion-input [(ngModel)]="customer.city"></ion-input>
        </ion-item>
      </ion-list>
      <ion-button expand="block" (click)="saveCustomer()">Save</ion-button>
    </ion-content>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CustomerFormModal {
  customer = {
    name: '',
    shopName: '',
    mobileNo: '',
    taxNo: '',
    address: '',
    city: '',
  };

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss();
  }

  saveCustomer() {
    this.modalController.dismiss(this.customer);
  }
}
