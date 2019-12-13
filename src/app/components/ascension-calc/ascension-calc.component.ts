import { Component, OnInit } from '@angular/core';
import * as rankInfo from "../../../assets/files/rank-info.json";

@Component({
  selector: 'ascension-calc',
  templateUrl: './ascension-calc.component.html',
  styleUrls: ['./ascension-calc.component.scss']
})
export class AscensionCalcComponent implements OnInit {

  xpInfo: any;

  helpOverlayIsActive: boolean;

  constructor() { }

  ngOnInit() {
  }

  helpOverlay() {
    this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
  }
}
