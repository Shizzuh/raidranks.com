import { Component, OnInit } from '@angular/core';
import * as rankInfo from "../../../assets/files/rank-info.json";
import * as campaignInfo from "../../../assets/files/campaign-gains.json"


@Component({
  selector: 'food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  xpInfo: any;

  campaignGains: any;

  campaignDifficulties: string[];
  chapterAndStages: string[];

  selectedDifficulty: string;
  selectedDifficultyVisual: string;
  selectedChapter: number;
  selectedStage: number;

  averageCompletionTime: number;

  doubleXP: boolean;
  raidPass: boolean;
  topOffChamps: boolean;

  requiredEnergy: number;
  requiredFarmingTime: number;
  requiredSparringPitTime: number;
  
  starRank: number;

  availableFood: Map<string, number>;

  reqStars: Map<string, number>;

  expReq: Map<string, number>;

  expReqPerc: Map<string, number>;

  helpOverlayIsActive: boolean;

  constructor() {
    this.xpInfo = rankInfo['default'];
    this.campaignGains = campaignInfo['default'];

    this.campaignDifficulties = Object.keys(this.campaignGains);
    for(let index in this.campaignDifficulties){
      this.campaignDifficulties[index] = this.campaignDifficulties[index].charAt(0).toUpperCase() + this.campaignDifficulties[index].substring(1);
    }
    
    this.chapterAndStages = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
    
    this.selectedDifficultyVisual = "Brutal";
    this.selectedDifficulty = "brutal";
    this.selectedChapter = 12;
    this.selectedStage = 3;

    this.averageCompletionTime = 0;

    this.doubleXP = true;
    this.raidPass = false;
    this.topOffChamps = false;

    this.requiredEnergy = 0;
    this.requiredFarmingTime = 0;
    this.requiredSparringPitTime = 0;

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
  }

  ngOnInit() {
    this.calculateRequirements();
  }

  calculateFarmingCosts(){
    this.selectedDifficulty = this.selectedDifficultyVisual.toLowerCase();
    let xpGain = this.campaignGains[(this.selectedDifficulty)][this.chapterAndStages[this.selectedChapter - 1]][this.chapterAndStages[this.selectedStage - 1]].xp;
    if(this.doubleXP){
      xpGain = xpGain*2;
    }
    if(this.raidPass){
      xpGain = xpGain*1.2;
    }
    console.log(xpGain);
  }

  calculateRequirements(){
    this.resetDynamics();
    this.calculateFood();
    this.calculateExperience();
    this.calculateFarmingCosts();
  }

  calculateExperience(){
    let temp = 0;
    let key: string;
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
