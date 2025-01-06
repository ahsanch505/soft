import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';
import { jsPDF } from 'jspdf';
import { IonicModule, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, IonicModule]  
})
export class ModelComponent implements OnInit {
  isModalOpen = false;  
  selectedImages: { url: string }[] = [];  
  combinedDescription = '';  

  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    Camera.requestPermissions().catch(err => console.error('Permission Error:', err));
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  async selectImages() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        { text: 'Take Photo', icon: 'camera', handler: () => this.takePicture() },
        { text: 'Choose from Gallery', icon: 'image', handler: () => this.selectFromGallery() },
        { text: 'Cancel', icon: 'close', role: 'cancel' },
      ],
    });
    await actionSheet.present();
  }
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        saveToGallery: true
      });
      if (image.dataUrl) this.selectedImages.push({ url: image.dataUrl });
    } catch (err) {
      console.error('Camera Error:', err);
    }
  }
  async selectFromGallery() {
    try {
      const images = await Camera.pickImages({ quality: 90, limit: 10 });
      for (const image of images.photos) this.processImage(image);
    } catch (err) {
      console.error('Gallery Error:', err);
    }
  }
  private async processImage(image: any) {
    if (image.webPath) {
      const blob = await fetch(image.webPath).then(res => res.blob());
      const reader = new FileReader();
      reader.onloadend = () => this.selectedImages.push({ url: reader.result as string });
      reader.readAsDataURL(blob);
    }
  }
  async shareAsPDF() {
    const pdf = new jsPDF();
    const [margin, imageSize, spacing] = [10, 50, 10];
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    let [x, y, maxY] = [margin, margin, 0];

    for (const imgData of this.selectedImages) {
      await new Promise<void>(resolve => {
        const img = new Image();
        img.onload = () => {
          pdf.addImage(img, 'JPEG', x, y, imageSize, imageSize);
          x += imageSize + spacing;
          maxY = Math.max(maxY, y + imageSize);
          if (x + imageSize > pageWidth - margin) [x, y] = [margin, y + imageSize + spacing];
          if (y + imageSize > pageHeight - margin) [x, y] = [margin, margin, pdf.addPage()];
          resolve();
        };
        img.src = imgData.url;
      });
    }

    pdf.text('Description:', margin, maxY + spacing);
    pdf.text(this.combinedDescription || 'No description provided.', margin, maxY + spacing + 10);
    const pdfBlob = pdf.output('blob');
    if (navigator.share) {
      await navigator.share({
        title: 'Shared Images PDF',
        text: 'Check out these images.',
        files: [new File([pdfBlob], 'images.pdf', { type: 'application/pdf' })],
      });
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = 'images.pdf';
      link.click();
    }
  }
}
