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

  arcane: Map<string, number>;
  affinity: Map<string, number>;

  helpOverlayIsActive: boolean;

  constructor() {
    this.xpInfo = rankInfo['default'];
    this.uncommon = new Map<string, number>();
    this.rare = new Map<string, number>();
    this.epic = new Map<string, number>();
    this.legendary = new Map<string, number>();
    this.arcane = new Map<string, number>();
    this.affinity = new Map<string, number>();
    this.initialise();
  }

  ngOnInit() {
  }

  calculatePotions(){
    this.resetPotions();
    this.calculatePotionsPerAff(this.uncommon, 'uncommon');
    this.calculatePotionsPerAff(this.rare, 'rare');
    this.calculatePotionsPerAff(this.epic, 'epic');
    this.calculatePotionsPerAff(this.legendary, 'legendary');
    console.log(this.arcane);
    console.log(this.affinity);
  }

  calculatePotionsPerAff(requesting: Map<string, number>, rarity: string){
    let totalArcane = 0;
    let totalAffinity = 0;
    for(let key in this.xpInfo){
      if(key in requesting && requesting[key] > 0){
        totalArcane += this.xpInfo[key].ascension[rarity].arcane;
        totalAffinity += this.xpInfo[key].ascension[rarity].affinity;
      }
    }
    if (totalArcane > 0 && totalAffinity > 0){
      this.arcane['superior'] += Math.floor(totalArcane/100);
      totalArcane -= this.arcane['superior']*100;
      this.arcane['greater'] += Math.floor(totalArcane/10);
      totalArcane -= this.arcane['greater']*10;
      this.arcane['lesser'] += totalArcane;
      
      this.affinity['superior'] += Math.floor(totalAffinity/100);
      totalAffinity -= this.affinity['superior']*100;
      this.affinity['greater'] += Math.floor(totalAffinity/10);
      totalAffinity -= this.affinity['greater']/10;
      this.affinity['lesser'] += totalAffinity;
    }
  }

  initialise(){
    this.uncommon['three'] = 0;
    this.uncommon['four'] = 0;
    this.uncommon['five'] = 0;
    this.uncommon['six'] = 0;

    this.rare['three'] = 0;
    this.rare['four'] = 0;
    this.rare['five'] = 0;
    this.rare['six'] = 0;

    this.epic['three'] = 0;
    this.epic['four'] = 0;
    this.epic['five'] = 0;
    this.epic['six'] = 0;

    this.legendary['three'] = 0;
    this.legendary['four'] = 0;
    this.legendary['five'] = 0;
    this.legendary['six'] = 0;

    this.resetPotions();
  }

  resetPotions(){
    this.arcane['lesser'] = 0;
    this.arcane['greater'] = 0;
    this.arcane['superior'] = 0;

    this.affinity['lesser'] = 0;
    this.affinity['greater'] = 0;
    this.affinity['superior'] = 0;
  }

  helpOverlay() {
    this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
  }
}
