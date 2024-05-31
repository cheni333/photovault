import { Injectable } from '@angular/core';
import { addDoc, collection, getFirestore, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { AlertController } from '@ionic/angular';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Photo } from './home/home-model';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private app = initializeApp(environment.firebaseConfig);
  private firestore = getFirestore(this.app);

  constructor(private alertController: AlertController) {}

  async addData(user: Photo) {
    try {
      if (!user.photoFile) {
        throw new Error('Photo file is undefined');
      }

      const addInfo = await addDoc(collection(this.firestore, "users"), {
        photoFile: user.photoFile,
        photoName: user.photoName || '' // ensure photoName is provided, default to empty string if undefined
      });
      console.log("Document written with ID: ", addInfo.id);
      this.presentAlert('Success', 'User Added');
    } catch (e) {
      console.error("Error adding document: ", e);
      this.presentAlert('Error', 'Failed to add user');
    }
  }

  async updateData(user: Photo) {
    try {
      if (!user.photoFile) {
        throw new Error('Photo file is undefined');
      }

      const updateInfo = doc(this.firestore, "users", user.id);
      await updateDoc(updateInfo, {
        photoFile: user.photoFile,
        photoName: user.photoName || '' // ensure photoName is provided, default to empty string if undefined
      });
      this.presentAlert('Success', 'Details Updated');
    } catch (e) {
      console.error("Error updating document: ", e);
      this.presentAlert('Error', 'Failed to update details');
    }
  }

  async deleteData(user: Photo) {
    try {
      const deleteInfo = doc(this.firestore, "users", user.id);
      await deleteDoc(deleteInfo);
      this.presentAlert('Success', 'User Deleted');
    } catch (e) {
      console.error("Error deleting document: ", e);
      this.presentAlert('Error', 'Failed to delete user');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
