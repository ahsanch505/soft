import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { jsPDF } from 'jspdf';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule]
})
export class FirstComponent implements OnInit {
  public isListOpen = false;
  public imageUrl?: string;
  public form!: FormGroup;
  public subtotal = 0;
  public totalPrice = 0;
  public discountOptions = [0, 5, 10, 15, 20, 25, 30];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      discount: [0, Validators.required],
      products: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.form.get('products')?.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });

    this.form.get('discount')?.valueChanges.subscribe(() => {
      this.calculateTotalPrice();
    });
  }

  public toggleList(): void {
    this.isListOpen = !this.isListOpen;
  }

  public async openCamera(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Camera,
        resultType: CameraResultType.DataUrl
      });
      
      this.imageUrl = image.dataUrl;
    } catch (error) {
      console.error('Error opening camera: ', error);
    }
  }

  public addProduct(): void {
    const productForm = this.fb.group({
      product: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]]
    });
    
    this.products.push(productForm);
  }

  public get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  public removeProduct(index: number): void {
    this.products.removeAt(index);
    this.calculateTotalPrice();
  }

  private calculateTotalPrice(): void {
    this.subtotal = 0;
    
    const productsValue = this.products.value;
    if (productsValue && Array.isArray(productsValue)) {
      productsValue.forEach(product => {
        const price = parseFloat(product.price) || 0;
        const quantity = parseInt(product.quantity) || 0;
        this.subtotal += price * quantity;
      });
    }
    
    const discount = this.form.get('discount')?.value || 0;
    this.totalPrice = this.subtotal * (1 - discount / 100);
  }

  public async onSubmit(): Promise<void> {
    if (this.form.valid) {
      console.log('Form Data:', this.form.value);
      await this.generatePDF();
    } else {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
    }
  }

  private async generatePDF(): Promise<void> {
    try {
      const pdf = new jsPDF();
      const formData = this.form.value;
      let yOffset = 20;

      if (this.imageUrl) {
        try {
          pdf.addImage(this.imageUrl, 'JPEG', 10, 10, 50, 50);
          yOffset = 70;
        } catch (error) {
          console.error('Error adding image to PDF:', error);
          yOffset = 20;
        }
      }
      
      pdf.setFontSize(18);
      pdf.text('Invoice', 105, yOffset, { align: 'center' });
      yOffset += 20;
      
      pdf.setFontSize(12);
      
      pdf.text(`Customer Name: ${formData.name}`, 20, yOffset);
      yOffset += 10;
      pdf.text(`Address: ${formData.address}`, 20, yOffset);
      yOffset += 20;
      
      pdf.setFontSize(14);
      pdf.text('Products', 20, yOffset);
      yOffset += 10;
      
      pdf.setFontSize(12);
      
      pdf.text('Product', 20, yOffset);
      pdf.text('Price', 80, yOffset);
      pdf.text('Quantity', 120, yOffset);
      pdf.text('Total', 160, yOffset);
      yOffset += 10;
      
      pdf.line(20, yOffset - 5, 190, yOffset - 5);
      
      formData.products.forEach((product: any) => {
        const total = (parseFloat(product.price) || 0) * (parseInt(product.quantity) || 0);
        
        pdf.text(product.product.toString(), 20, yOffset);
        pdf.text(`$${parseFloat(product.price).toFixed(2)}`, 80, yOffset);
        pdf.text(product.quantity.toString(), 120, yOffset);
        pdf.text(`$${total.toFixed(2)}`, 160, yOffset);
        
        yOffset += 10;
      });
      
      pdf.line(20, yOffset, 190, yOffset);
      yOffset += 15;
      
      pdf.text(`Subtotal: $${this.subtotal.toFixed(2)}`, 120, yOffset);
      yOffset += 10;
      pdf.text(`Discount: ${formData.discount}%`, 120, yOffset);
      yOffset += 10;
      pdf.text(`Total Price: $${this.totalPrice.toFixed(2)}`, 120, yOffset);
      
      pdf.save('invoice.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}