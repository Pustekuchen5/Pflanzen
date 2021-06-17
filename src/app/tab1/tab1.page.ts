import { Component, ChangeDetectorRef } from '@angular/core';
import { Photo, PhotoService } from '../services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Tab3Page } from '../tab3/tab3.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  start = new Date('07/06/2021');
  end = new Date('08/06/2021');
  /* passedId = null; */
  plantName = '';

  progressCurrentTime: number = 0;
  constructor(public photoService: PhotoService, private activatedRoute: ActivatedRoute, public modalCtrl: ModalController
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

    const plans = [
      {
        name: 'ML',
        timer: '9h15',
        photo: {
          name: '',
          path: ''
        }
      }
    ];
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
    this.plantName = this.activatedRoute.snapshot.paramMap.get('id');
  }

  deletePictureFromGallery(photo, position) {
    this.photoService.deletePicture(photo, position);
  }
  async editPhoto() {
    const modal = await this.modalCtrl.create({
      component: Tab3Page
    })
    modal.onDidDismiss().then(newPhotoObj => {
      console.log(newPhotoObj.data);
    })
    return await modal.present()
  }

  async update(selectedPhoto) {
    const modal = await this.modalCtrl.create({
      component: Tab3Page,
      componentProps: { photo: selectedPhoto }
    })

    modal.onDidDismiss().then(() => {
      this.photoService.loadSaved();
    })

    return await modal.present()
  }
}
