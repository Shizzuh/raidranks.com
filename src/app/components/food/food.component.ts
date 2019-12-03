import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  oneStar = 1;
  twoStar = 2;
  threeStar = 3;
  fourStar = 4;
  fiveStar = 5;
  sixStar = 6;
  
  starRank: number;

  availableFood: number[];
  availFiveStars: number;
  availFourStars: number;
  availThreeStars: number;
  availTwoStars: number;
  availOneStars: number;

  reqSixStars: number;
  reqFiveStars: number;
  reqFourStars: number;
  reqThreeStars: number;
  reqTwoStars: number;
  reqOneStars: number;

  constructor() {
    this.starRank = 6;
    this.reqSixStars = 1;
    this.reqFiveStars = 6;
    this.reqFourStars = 30;
    this.reqThreeStars = 120;
    this.reqTwoStars = 360;
    this.reqOneStars = 720;
   }

  ngOnInit() {}

  calculateFood(){
    console.log('Actually calls the method :)')
    this.resetReqStars;
    if ( this.starRank == this.sixStar ) {
      this.reqSixStars = 1;
      this.reqFiveStars = this.reqSixStars * this.sixStar - this.availFiveStars;
    }
    if ( this.starRank == this.sixStar || this.starRank == this.fiveStar ) {
      if ( this.starRank == this.fiveStar ) {
        this.reqFiveStars = 1;
      }
      this.reqFourStars = Math.max(this.reqFiveStars * this.fiveStar - this.availFourStars, 0);
    }
    if ( this.starRank == this.fourStar ) {
      this.reqFourStars = 1;
    }
    this.reqThreeStars = Math.max(this.reqFourStars * this.fourStar - this.availThreeStars, 0);
    this.reqTwoStars = Math.max(this.reqThreeStars * this.threeStar - this.availTwoStars, 0);
    this.reqOneStars = Math.max(this.reqTwoStars * this.twoStar - this.availOneStars, 0);
  }

  resetReqStars(){
    this.reqSixStars = 0;
    this.reqFiveStars = 0;
    this.reqFourStars = 0;
    this.reqThreeStars = 0;
    this.reqTwoStars = 0;
    this.reqOneStars = 0;
  }
}
