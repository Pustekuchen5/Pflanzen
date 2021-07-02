import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController, Platform, AlertController } from '@ionic/angular';
import { PhotoService, Photo } from '../services/photo.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import * as moment from 'moment';

@Component({
  selector: 'app-steckbrief',
  templateUrl: 'steckbrief.page.html',
  styleUrls: ['steckbrief.page.scss']
})
export class SteckbriefPage implements OnInit {
  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  selectedDay: number;
  chosenHours: number;
  chosenMinutes: number;

  @Input() photo: Photo;
  photoName;
  photoDiscription;
  newPhotoObject;

  constructor(public navCtrl: NavController, public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications, public modalCtr: ModalController, public photoService: PhotoService) {
    this.notifyTime = moment(new Date()).format();

    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();

    this.days = [
      { title: 'Monday', value: 1 },
      { title: 'Tuesday', value: 2 },
      { title: 'Wednesday', value: 3 },
      { title: 'Thursday', value: 4 },
      { title: 'Friday', value: 5 },
      { title: 'Saturday', value: 6 },
      { title: 'Sunday', value: 0 }
    ];
    this.selectedDay = 1;
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

  timeChange(time) {
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
    console.log(this.chosenHours, this.chosenMinutes);
  }

  addNotifications() {
    console.log("CHOSENhours=", this.chosenHours);
    console.log("ChosenMINUTES", this.chosenMinutes);
    console.log("Notify time=", this.notifyTime);
    let currentDate = new Date();
    let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.

    if (this.selectedDay) {
      console.log(this.selectedDay);

      let firstNotificationTime = new Date();
      let dayDifference = this.selectedDay - currentDay;

      if (dayDifference < 0) {
        dayDifference = dayDifference + 7; // for cases where the day is in the following week
      }

      firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
      firstNotificationTime.setHours(this.chosenHours);
      firstNotificationTime.setMinutes(this.chosenMinutes);
      console.log("Fist notification time=", firstNotificationTime);

      let notification = {
        id: this.selectedDay,
        title: 'ALARM',
        text: 'Pflanzt mich :)',
        at: firstNotificationTime,
        every: 'week'
      };
      this.notifications.push(notification);

    }

    console.log("Notifications to be scheduled: ", this.notifications);

    if (this.platform.is('capacitor')) {

      // Cancel any existing notifications
      this.localNotifications.cancelAll().then(async () => {

        // Schedule the new notifications
        this.localNotifications.schedule(this.notifications);

        this.notifications = [];

        let alert = await this.alertCtrl.create({
          header: 'Alarm Set',
          buttons: ['Ok']
        });

        await alert.present();

      });

    }
  }

}
