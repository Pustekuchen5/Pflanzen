import { Component, ChangeDetectorRef } from '@angular/core';
import { Photo, PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  start = new Date();
  end = new Date();
  constructor(public photoService: PhotoService
  ) {
    this.end.setMinutes(this.end.getMinutes() + 7200);
    this.setUpProgressBar("#pb", this.start.getTime(), this.end.getTime(), 100);
  }
  setUpProgressBar(selector, startTime, endTime, update) {

    var timer
    var elem = document.querySelector(selector)
    console.log(elem);
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
}
