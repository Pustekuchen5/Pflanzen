import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  changeClassWater(){
    if (document.getElementById("wasserbedarf").className == "water water-abit"){
      document.getElementById("wasserbedarf").className = "water water-alot";
    }
    else if (document.getElementById("wasserbedarf").className == "water water-alot"){
      document.getElementById("wasserbedarf").className = "water water-medium";
    }
    else if (document.getElementById("wasserbedarf").className == "water water-medium"){
      document.getElementById("wasserbedarf").className = "water water-abit";
    }
  }

  changeClassTemp(){
    if (document.getElementById("temperatur").className == "temperatur temperatur-abit"){
      document.getElementById("temperatur").className = "temperatur temperatur-alot";
    }
    else if (document.getElementById("temperatur").className == "temperatur temperatur-alot"){
      document.getElementById("temperatur").className = "temperatur temperatur-medium";
    }
    else if (document.getElementById("temperatur").className == "temperatur temperatur-medium"){
      document.getElementById("temperatur").className = "temperatur temperatur-abit";
    }
  }

  changeClassLicht(){
    if (document.getElementById("licht").className == "licht licht-abit"){
      document.getElementById("licht").className = "licht licht-alot";
    }
    else if (document.getElementById("licht").className == "licht licht-alot"){
      document.getElementById("licht").className = "licht licht-medium";
    }
    else if (document.getElementById("licht").className == "licht licht-medium"){
      document.getElementById("licht").className = "licht licht-abit";
    }
  }

  changeClassFeuchtigkeit(){
    if (document.getElementById("feuchtigkeit").className == "feuchtigkeit feuchtigkeit-abit"){
      document.getElementById("feuchtigkeit").className = "feuchtigkeit feuchtigkeit-alot";
    }
    else if (document.getElementById("feuchtigkeit").className == "feuchtigkeit feuchtigkeit-alot"){
      document.getElementById("feuchtigkeit").className = "feuchtigkeit feuchtigkeit-medium";
    }
    else if (document.getElementById("feuchtigkeit").className == "feuchtigkeit feuchtigkeit-medium"){
      document.getElementById("feuchtigkeit").className = "feuchtigkeit feuchtigkeit-abit";
    }
  }
}