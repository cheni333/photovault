import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  selectedFile: File | null = null;
  uploadedFile: string | null = null;
  downloadedPhoto: string | null = null; // Define downloadedPhoto property

  constructor() {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.getImageSrc(this.selectedFile); // Call getImageSrc to update downloadedPhoto
  }

  getImageSrc(file: File) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.downloadedPhoto = event.target.result; // Update downloadedPhoto with file data URL
    };

    reader.readAsDataURL(file);
  }

  upload() {
    if (this.selectedFile) {
      
      this.uploadedFile = 'https://example.com/uploaded-file.jpg';
    }
  }

  logOut() {
    // Logout logic
  }
}