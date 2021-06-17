import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @Input() photo;
  photoName;
  newPhotoObject = {};
  constructor(private nav: NavController, public modalCtr: ModalController, public photoService: PhotoService) {

  }
  /* ngOnInit(): void {
    throw new Error('Method not implemented.');
  } */
  ngOnInit() {
    this.photoName = this.photo.value.photoName
  }
  enterName() {
    this.nav.navigateBack(`/second/${this.newPhotoObject}`);
  }
  async dismis() {
    await this.modalCtr.dismiss(this.photoName);
  }
  async update() {
    this.newPhotoObject = ({ photoName: this.photoName });
    console.log(this.newPhotoObject);
    let uid = this.photo.key

    if (uid) {
      await this.photoService.loadSaved()
    } else {
      console.log("can't save empty task");
    }
    this.dismis();
  }
}
