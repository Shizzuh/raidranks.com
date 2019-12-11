import { Component, OnInit } from '@angular/core';
import * as rankInfo from "../../../assets/files/rank-info.json";


@Component({
  selector: 'food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  xpInfo: any;
  
  starRank: number;

  availableFood: Map<string, number>;

  reqStars: Map<string, number>;

  expReq: Map<string, number>;

  expReqPerc: Map<string, number>;

  helpOverlayIsActive: boolean;

  constructor() {
    this.xpInfo = rankInfo['default'];
    console.log(typeof(rankInfo['default']));
    console.log(rankInfo);
    console.log(typeof(this.xpInfo))
    console.log(this.xpInfo);
    this.starRank = 6;
    this.reqStars = new Map<string, number>();
    this.expReq = new Map<string, number>();
    this.expReqPerc = new Map<string, number>();
    this.availableFood = new Map<string, number>();
    this.availableFood['one'] = 0; 
    this.availableFood['two'] = 0;
    this.availableFood['three'] = 0;
    this.availableFood['four'] = 0;
    this.availableFood['five'] = 0;
    this.helpOverlayIsActive = false;
    this.calculateRequirements();
  }

  ngOnInit() {}

  calculateRequirements(){
    this.resetDynamics();
    this.calculateFood();
    this.calculateExperience();
  }

  calculateExperience(){
    let temp = 0;
    let key;
    for (key of Object.keys(this.xpInfo)){
      if(this.reqStars[key] <= this.xpInfo[key].star + 1 && this.reqStars[key] > 0 && this.xpInfo[key].star != this.starRank){
        this.expReq[key] = this.xpInfo[key].xpRequired;
      } else {
        temp = Math.round(this.reqStars[key] / (this.xpInfo[key].star + 1));
        if(temp != 0){
          this.expReq[key] = this.xpInfo[key].xpRequired * Math.max(temp, 1); 
        }
      }
      this.expReq['total'] += this.expReq[key];
    }
    for (let key in this.xpInfo){
      this.expReqPerc[key] = Math.round((this.expReq[key] / this.expReq['total']) * 100 * 100) / 100;
    }
  }

  calculateFood(){
    if ( this.starRank == this.xpInfo.six.star ) {
      this.reqStars['six'] = 1;
      this.reqStars['five'] = this.reqStars['six'] * this.xpInfo.six.star - this.availableFood['five'];
    }
    if ( this.starRank == this.xpInfo.six.star || this.starRank == this.xpInfo.five.star ) {
      if ( this.starRank == this.xpInfo.five.star ) {
        this.reqStars['five'] = 1;
      }
      this.reqStars['four'] = Math.max(this.reqStars['five'] * this.xpInfo.five.star - this.availableFood['four'], 0);
    }
    if ( this.starRank == this.xpInfo.four.star ) {
      this.reqStars['four'] = 1;
    }
    this.reqStars['three'] = Math.max(this.reqStars['four'] * this.xpInfo.four.star - this.availableFood['three'], 0);
    this.reqStars['two'] = Math.max(this.reqStars['three'] * this.xpInfo.three.star - this.availableFood['two'], 0);
    this.reqStars['one'] = Math.max(this.reqStars['two'] * this.xpInfo.two.star - this.availableFood['one'], 0);
  }

  resetDynamics(){
    this.reqStars['one'] = 0;
    this.reqStars['two'] = 0;
    this.reqStars['three'] = 0;
    this.reqStars['four'] = 0;
    this.reqStars['five'] = 0;
    this.reqStars['six'] = 0;

    this.expReq['total'] = 0;
    this.expReq['one'] = 0;
    this.expReq['two'] = 0;
    this.expReq['three'] = 0;
    this.expReq['four'] = 0;
    this.expReq['five'] = 0;
    this.expReq['six'] = 0;

    this.expReqPerc['one'] = 0;
    this.expReqPerc['two'] = 0;
    this.expReqPerc['three'] = 0;
    this.expReqPerc['four'] = 0;
    this.expReqPerc['five'] = 0;
    this.expReqPerc['six'] = 0;
  }

  helpOverlay() {
    this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
  }
}
