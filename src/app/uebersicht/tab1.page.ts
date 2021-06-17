import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  plants: any = [];
  constructor(public database: DatabaseService) {
    this.database.createDatabase().then(() => {
      //call get plants
      this.getPlants();
    })
  }

  ngOnInIt() { }

  getPlants() {
    this.database.getPlants().then((data) => {
      this.plants = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.plants.push(data.rows.item(i));
        }
      }
    });
  }

  deletePlant(id: number) {
    this.database.deletePlant(id).then((data) => {
      alert(data);
      this.getPlants();
    });
  }
}
