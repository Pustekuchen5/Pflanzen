import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoService, Photo } from '../services/photo.service';

@Component({
  selector: 'app-steckbrief',
  templateUrl: 'steckbrief.page.html',
  styleUrls: ['steckbrief.page.scss']
})
export class SteckbriefPage implements OnInit {
  @Input() photo: Photo;
  photoName;
  photoDiscription;
  newPhotoObject;
  constructor(public modalCtr: ModalController, public photoService: PhotoService) {

  }

  ngOnInit() {
    this.photoName = this.photo.photoName;
    this.photoDiscription = this.photo.photoDiscription;
  }

  async dismis() {
    await this.modalCtr.dismiss(this.photoName, this.photoDiscription);
  }

  async update() {
    this.newPhotoObject = ({ photoName: this.photoName, photoDiscription: this.photoDiscription });
    console.log(this.photo);
    this.photo.photoName = this.photoName;
    this.photo.photoDiscription = this.photoDiscription;
    console.log(this.photo);
    console.log(this.newPhotoObject);
    await this.photoService.updatePhoto(this.photo, this.newPhotoObject);
    this.dismis();
  }

}
