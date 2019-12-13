import { Component, OnInit } from '@angular/core';
import * as rankInfo from "../../../assets/files/rank-info.json";

@Component({
  selector: 'ascension-calc',
  templateUrl: './ascension-calc.component.html',
  styleUrls: ['./ascension-calc.component.scss']
})
export class AscensionCalcComponent implements OnInit {

  xpInfo: any;

  uncommon: Map<string, number>;
  rare: Map<string, number>;
  epic: Map<string, number>;
  legendary: Map<string, number>;

  helpOverlayIsActive: boolean;

  constructor() {
    this.xpInfo = rankInfo['default'];
    this.uncommon = new Map<string, number>().set('three', 0).set('four', 0).set('five', 0).set('six', 0);
    this.rare = new Map<string, number>([['three', 0], ['four', 0], ['five', 0], ['six', 0]]);
    this.epic = new Map<string, number>();
    this.epic['three'] = 0
    this.epic['four'] = 0
    this.epic['five'] = 0
    this.epic['six'] = 0
    // this.legendary = new Map<string, number>([['three', 0], ['four', 0], ['five', 0], ['six', 0]]);
    console.log(this.uncommon);
    console.log(this.rare);
    console.log(this.epic)
  }

  ngOnInit() {
  }

  calculatePotions(){
    console.log("Calls this method")
  }

  helpOverlay() {
    this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
  }
}
