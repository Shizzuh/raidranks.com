import { Component, OnInit } from '@angular/core';
import * as rankInfo from "../../../assets/files/rank-info.json";

@Component({
  selector: 'ascension-calc',
  templateUrl: './ascension-calc.component.html',
  styleUrls: ['./ascension-calc.component.scss']
})
export class AscensionCalcComponent implements OnInit {

  xpInfo: any;
  cascadeCount: Map<string, string[]>;

  uncommon: Map<string, number>;
  rare: Map<string, number>;
  epic: Map<string, number>;
  legendary: Map<string, number>;

  arcane: Map<string, number>;
  affinity: Map<string, number>;

  helpOverlayIsActive: boolean;

  constructor() {
    this.xpInfo = rankInfo['default'];
    this.cascadeCount = new Map<string, string[]>();
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
  }

  calculatePotionsPerAff(requesting: Map<string, number>, rarity: string){
    for(let key in requesting){
      if(requesting[key] > 0){
        for(let star of this.cascadeCount[key]){
          if(this.xpInfo[star].ascension[rarity].arcane % 100 == 0){
            this.arcane['superior'] += this.xpInfo[star].ascension[rarity].arcane * requesting[key]/100;
          } else if(this.xpInfo[star].ascension[rarity].arcane % 10 == 0){
            this.arcane['greater'] += this.xpInfo[star].ascension[rarity].arcane * requesting[key]/10;
          } else {
            this.arcane['lesser'] += this.xpInfo[star].ascension[rarity].arcane * requesting[key];
          }
          if(this.xpInfo[star].ascension[rarity].affinity % 100 == 0){
            this.affinity['superior'] += this.xpInfo[star].ascension[rarity].affinity * requesting[key]/100;
          } else if(this.xpInfo[star].ascension[rarity].affinity % 10 == 0){
            this.affinity['greater'] += this.xpInfo[star].ascension[rarity].affinity * requesting[key]/10;
          } else {
            this.affinity['lesser'] += this.xpInfo[star].ascension[rarity].affinity * requesting[key];
          }
        }
      }
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

    this.cascadeCount['six'] = ['six', 'five', 'four', 'three', 'two', 'one'];
    this.cascadeCount['five'] = ['five', 'four', 'three', 'two', 'one'];
    this.cascadeCount['four'] = ['four', 'three', 'two', 'one'];
    this.cascadeCount['three'] = ['three', 'two', 'one'];

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
