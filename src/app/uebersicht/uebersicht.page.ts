import { Component, ChangeDetectorRef } from '@angular/core';
import { Photo, PhotoService } from '../services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController, Platform } from '@ionic/angular';
import { SteckbriefPage } from '../steckbrief/steckbrief.page';
import { LocalNotifications, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { scheduled } from 'rxjs';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-uebersicht',
  templateUrl: 'uebersicht.page.html',
  styleUrls: ['uebersicht.page.scss']
})
export class UebersichtPage {
  start = new Date('07/06/2021');
  end = new Date('08/06/2021');
  photoName = '';
  photoDiscription = '';
  photoLocation = '';

  progressCurrentTime: number = 0;
  constructor(private menu: MenuController, public photoService: PhotoService, private activatedRoute: ActivatedRoute, public modalCtrl: ModalController, private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController
  ) {
    this.end.setMinutes(this.end.getMinutes() + 1);
    this.setUpProgressBar("#pb", this.start.getTime(), this.end.getTime(), 100);
    const seconds = 24 * 60 * 60;
    const minutes = 24 * 60;
    const minute = 60 * 1000;
    const target = 8;
    const current = 21;
    this.progressCurrentTime = (current - target) / 24;
    const timerInterval = setInterval(() => {
      this.progressCurrentTime += 1 / minutes;
      if (this.progressCurrentTime === 1) {
        clearInterval(timerInterval);
      }
    }, minute);

  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  setUpProgressBar(selector, startTime, endTime, update) {

    var timer
    var elem = document.querySelector(selector)
    console.log(elem);
    if (elem) {
      var max = endTime - startTime
      elem.max = max

      var setValue = function () {
        var currentTime = new Date().getTime()
        var ellasped = currentTime - startTime
        if (ellasped >= max) {
          ellasped = max
          window.clearTimeout(timer)
        }
        elem.value = ellasped
        var prec = ellasped / max * 100
        elem.setAttribute("data-label", prec.toFixed(2) + '%')
      }

      setValue()
      timer = window.setInterval(setValue, update)
    }
    return
  }


  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  deletePictureFromGallery(photo, position) {
    this.photoService.deletePicture(photo, position);
  }

  async update(selectedPhoto) {
    const modal = await this.modalCtrl.create({
      component: SteckbriefPage,
      componentProps: { photo: selectedPhoto }
    })

    modal.onDidDismiss().then(() => {
      this.photoService.loadSaved();
    })

    return await modal.present()
  }

}
