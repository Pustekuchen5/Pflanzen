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

  changeClassWater() {
    if (document.getElementById("wasserbedarf").className == "water water-abit") {
      document.getElementById("wasserbedarf").className = "water water-alot";
    }
    else if (document.getElementById("wasserbedarf").className == "water water-alot") {
      document.getElementById("wasserbedarf").className = "water water-medium";
    }
    else if (document.getElementById("wasserbedarf").className == "water water-medium") {
      document.getElementById("wasserbedarf").className = "water water-abit";
    }
  }

  changeClassTemp() {
    if (document.getElementById("temperatur").className == "temperatur temperatur-abit") {
      document.getElementById("temperatur").className = "temperatur temperatur-alot";
    }
    else if (document.getElementById("temperatur").className == "temperatur temperatur-alot") {
      document.getElementById("temperatur").className = "temperatur temperatur-medium";
    }
    else if (document.getElementById("temperatur").className == "temperatur temperatur-medium") {
      document.getElementById("temperatur").className = "temperatur temperatur-abit";
    }
  }

  changeClassLicht() {
    if (document.getElementById("licht").className == "licht licht-abit") {
      document.getElementById("licht").className = "licht licht-alot";
    }
    else if (document.getElementById("licht").className == "licht licht-alot") {
      document.getElementById("licht").className = "licht licht-medium";
    }
    else if (document.getElementById("licht").className == "licht licht-medium") {
      document.getElementById("licht").className = "licht licht-abit";
    }
  }

  changeClassFeuchtigkeit() {
    if (document.getElementById("feuchtigkeit").className == "feuchtigkeit feuchtigkeit-abit") {
      document.getElementById("feuchtigkeit").className = "feuchtigkeit feuchtigkeit-alot";
    }
    else if (document.getElementById("feuchtigkeit").className == "feuchtigkeit feuchtigkeit-alot") {
      document.getElementById("feuchtigkeit").className = "feuchtigkeit feuchtigkeit-medium";
    }
    else if (document.getElementById("feuchtigkeit").className == "feuchtigkeit feuchtigkeit-medium") {
      document.getElementById("feuchtigkeit").className = "feuchtigkeit feuchtigkeit-abit";
    }
  }

}
