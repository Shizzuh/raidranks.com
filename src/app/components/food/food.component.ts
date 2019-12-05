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

  expReq: Map<string, number>;

  helpOverlayIsActive: boolean;

  constructor() {
    this.initialise();
    this.starRank = 6;
    this.helpOverlayIsActive = false;
   }

  ngOnInit() {}

  calculateRequirements(){
    this.calculateFood();
    this.calculateExperience();
  }

  calculateExperience(){
    this.expReq['total'] = 0;
    for (let key in this.star){
      this.expReq['total'] += this.expReq[key] * this.reqStars[key];
    }
  }

  calculateFood(){
    this.resetReqStars();
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

  resetReqStars(){
    this.reqStars['one'] = 0;
    this.reqStars['two'] = 0;
    this.reqStars['three'] = 0;
    this.reqStars['four'] = 0;
    this.reqStars['five'] = 0;
    this.reqStars['six'] = 0;
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

    this.expReq = new Map<string, number>();
    this.expReq['total'] = 91013247;
    this.expReq['one'] = 22761;
    this.expReq['two'] = 81326;
    this.expReq['three'] = 200684;
    this.expReq['four'] = 449080;
    this.expReq['five'] = 963803;
    this.expReq['six'] = 2010669;
  }

  helpOverlay() {
    this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
  }
}
