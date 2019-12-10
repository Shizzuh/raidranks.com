import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  starRank: number;

  star: Map<string, number>;

  availableFood: Map<string, number>;

  reqStars: Map<string, number>;

  expReqLvl: Map<string, number>;

  expReq: Map<string, number>

  helpOverlayIsActive: boolean;

  constructor() {
    this.initialise();
    this.starRank = 6;
    this.helpOverlayIsActive = false;
   }

  ngOnInit() {}

  calculateRequirements(){
    this.resetDynamics();
    this.calculateFood();
    this.calculateExperience();
  }

  calculateExperience(){
    let temp = 0;
    for (let key in this.star){
      temp = Math.round(this.reqStars[key] / (this.star[key] + 1));
      if(temp != 0){
        this.expReq[key] = this.expReqLvl[key] * Math.max(temp, 1)
        this.expReq['total'] += this.expReq[key];
      }
    }
  }

  calculateFood(){
    if ( this.starRank == this.star['six'] ) {
      this.reqStars['six'] = 1;
      this.reqStars['five'] = this.reqStars['six'] * this.star['six'] - this.availableFood['five'];
    }
    if ( this.starRank == this.star['six'] || this.starRank == this.star['five'] ) {
      if ( this.starRank == this.star['five'] ) {
        this.reqStars['five'] = 1;
      }
      this.reqStars['four'] = Math.max(this.reqStars['five'] * this.star['five'] - this.availableFood['four'], 0);
    }
    if ( this.starRank == this.star['four'] ) {
      this.reqStars['four'] = 1;
    }
    this.reqStars['three'] = Math.max(this.reqStars['four'] * this.star['four'] - this.availableFood['three'], 0);
    this.reqStars['two'] = Math.max(this.reqStars['three'] * this.star['three'] - this.availableFood['two'], 0);
    this.reqStars['one'] = Math.max(this.reqStars['two'] * this.star['two'] - this.availableFood['one'], 0);
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
  }

  initialise(){
    this.star = new Map<string, number>();
    this.star['one'] = 1;
    this.star['two'] = 2;
    this.star['three'] = 3;
    this.star['four'] = 4;
    this.star['five'] = 5;
    this.star['six'] = 6;

    this.availableFood = new Map<string, number>();
    this.availableFood['one'] = 0; 
    this.availableFood['two'] = 0;
    this.availableFood['three'] = 0;
    this.availableFood['four'] = 0;
    this.availableFood['five'] = 0;

    this.reqStars = new Map<string, number>();
    this.reqStars['one'] = 720;
    this.reqStars['two'] = 360;
    this.reqStars['three'] = 120;
    this.reqStars['four'] = 30;
    this.reqStars['five'] = 6;
    this.reqStars['six'] = 1;

    this.expReq = new Map<string, number>()
    this.expReq['total'] = 27631883;
    this.expReq['one'] = 8193960;
    this.expReq['two'] = 9759120;
    this.expReq['three'] = 6020520;
    this.expReq['four'] = 2694480;
    this.expReq['five'] = 963803;
    this.expReq['six'] = 0;

    this.expReqLvl = new Map<string, number>();
    this.expReqLvl['one'] = 22761;
    this.expReqLvl['two'] = 81326;
    this.expReqLvl['three'] = 200684;
    this.expReqLvl['four'] = 449080;
    this.expReqLvl['five'] = 963803;
    this.expReqLvl['six'] = 2010669;
  }

  helpOverlay() {
    this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
  }
}
