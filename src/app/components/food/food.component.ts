import { Component, OnInit } from '@angular/core';
import * as rankInfo from "../../../assets/files/rank-info.json";
import * as campaignInfo from "../../../assets/files/campaign-gains.json"


@Component({
  selector: 'food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {

  champInfo: any;

  campaignGains: any;

  campaignDifficulties: string[];
  chapterAndStages: string[];

  selectedDifficulty: string;
  selectedDifficultyVisual: string;
  selectedChapter: any;
  selectedStage: any;

  averageFarmingTime: number;

  doubleXP: boolean;
  raidPass: boolean;
  topOffChamps: boolean;

  requiredEnergy: number;
  requiredFarmingTime: number;
  requiredFarmingRuns: number;
  requiredSparringPitTime: number;
  silverGain: number;
  
  starRank: number;

  availableFood: Map<string, number>;

  reqStars: Map<string, number>;

  expReq: Map<string, number>;

  expReqPerc: Map<string, number>;

  helpOverlayIsActive: boolean;

  constructor() {
    this.champInfo = rankInfo['default'];
    this.campaignGains = campaignInfo['default'];

    this.campaignDifficulties = Object.keys(this.campaignGains);
    for(let index in this.campaignDifficulties){
      this.campaignDifficulties[index] = this.campaignDifficulties[index].charAt(0).toUpperCase() + this.campaignDifficulties[index].substring(1);
    }
    
    this.chapterAndStages = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
    
    this.selectedDifficultyVisual = "Brutal";
    this.selectedDifficulty = "brutal";
    this.selectedChapter = "12";
    this.selectedStage = "3";

    this.averageFarmingTime = 0;

    this.doubleXP = true;
    this.raidPass = false;
    this.topOffChamps = false;

    this.requiredEnergy = 0;
    this.requiredFarmingTime = 0;
    this.requiredFarmingRuns = 0;
    this.requiredSparringPitTime = 0;
    this.silverGain = 0;

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
    let selectedStage = this.campaignGains[this.selectedDifficulty][this.chapterAndStages[this.selectedChapter - 1]][this.chapterAndStages[this.selectedStage - 1]]; 
    this.requiredEnergy = 0;
    this.requiredFarmingRuns = 0;
    this.requiredSparringPitTime = 0;
    this.selectedDifficulty = this.selectedDifficultyVisual.toLowerCase();
    let xpGain = selectedStage.xp;
    if(this.doubleXP){
      xpGain = xpGain * 2;
    }
    if(this.raidPass){
      xpGain = xpGain * 1.2;
    }
    let runsPerRank = 0;
    let temp = 0;
    for(let key of Object.keys(this.champInfo)){
      if(this.reqStars[key] > 0){
        runsPerRank = this.champInfo[key].xpRequired / xpGain;
        if(this.topOffChamps){
          temp = runsPerRank;
          runsPerRank = Math.floor(runsPerRank);
          this.requiredSparringPitTime += ((temp - runsPerRank) * this.champInfo[key].xpRequired) / (4000 + 100 * (this.champInfo[key].star - 1));
        } else {
          runsPerRank = Math.ceil(runsPerRank);
        }
        this.requiredEnergy += runsPerRank * selectedStage.energy * Math.max(this.reqStars[key] / (this.champInfo[key].star + 1), 1);
        this.requiredFarmingRuns += Math.ceil(runsPerRank * Math.max(this.reqStars[key] / (this.champInfo[key].star + 1), 1));
      }
    }
    this.requiredFarmingTime = Math.round((this.requiredFarmingRuns * this.averageFarmingTime) / 36) / 100;
    this.requiredSparringPitTime = Math.round(this.requiredSparringPitTime * 100) / 100;
    this.silverGain = this.requiredFarmingRuns * selectedStage.silver;
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
    for (key of Object.keys(this.champInfo)){
      if(this.reqStars[key] <= this.champInfo[key].star + 1 && this.reqStars[key] > 0 && this.champInfo[key].star != this.starRank){
        this.expReq[key] = this.champInfo[key].xpRequired;
      } else {
        temp = Math.round(this.reqStars[key] / (this.champInfo[key].star + 1));
        if(temp != 0){
          this.expReq[key] = this.champInfo[key].xpRequired * Math.max(temp, 1); 
        }
      }
      this.expReq['total'] += this.expReq[key];
    }
    for (let key in this.champInfo){
      this.expReqPerc[key] = Math.round((this.expReq[key] / this.expReq['total']) * 100 * 100) / 100;
    }
  }

  calculateFood(){
    if ( this.starRank == this.champInfo.six.star ) {
      this.reqStars['six'] = 1;
      this.reqStars['five'] = this.reqStars['six'] * this.champInfo.six.star - this.availableFood['five'];
    }
    if ( this.starRank == this.champInfo.six.star || this.starRank == this.champInfo.five.star ) {
      if ( this.starRank == this.champInfo.five.star ) {
        this.reqStars['five'] = 1;
      }
      this.reqStars['four'] = Math.max(this.reqStars['five'] * this.champInfo.five.star - this.availableFood['four'], 0);
    }
    if ( this.starRank == this.champInfo.four.star ) {
      this.reqStars['four'] = 1;
    }
    this.reqStars['three'] = Math.max(this.reqStars['four'] * this.champInfo.four.star - this.availableFood['three'], 0);
    this.reqStars['two'] = Math.max(this.reqStars['three'] * this.champInfo.three.star - this.availableFood['two'], 0);
    this.reqStars['one'] = Math.max(this.reqStars['two'] * this.champInfo.two.star - this.availableFood['one'], 0);
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
