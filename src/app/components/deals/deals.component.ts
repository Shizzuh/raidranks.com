import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {

  values = {
    ancientShard: 2, //set
    voidShard: 5, //set
    sacredShard: 25, //set
    energy: .007, //set
    gem: .023, //set
    silver: .000007, //set
    exp: 2.2, //set
    energyRefill: .92, //set
    clanBossKey: 2.3, //set
    rareBook: 1,
    epicBook: 3,
    legendaryBook: 15,
    brew: .005,
    chicken3: .5,
    chicken4: 2,
    chicken5: 10
  }

  price:number;
  ancientShard:number;
  voidShard:number;
  sacredShard:number;
  rareBook:number;
  epicBook:number;
  legendaryBook:number;
  energy:number;
  energyRefill:number;
  gem:number;
  brew:number;
  clanBossKey:number;
  chicken3:number;
  chicken4:number;
  chicken5:number;
  silver:number;
  exp:number;

  ancientShardValue: number;
  voidShardValue: number;
  sacredShardValue: number;
  rareBookValue: number;
  epicBookValue: number;
  legendaryBookValue: number;
  energyValue: number;
  energyRefillValue: number;
  gemValue: number;
  brewValue: number;
  clanBossKeyValue: number;
  chicken3Value: number;
  chicken4Value: number;
  chicken5Value: number;
  silverValue: number;
  expValue: number;

  priceValue: number;
  grandTotal: number;

  score: number;

  constructor() { }

  ngOnInit() {
  }

  calulateValue() {
    this.priceValue = this.price;

    if (this.ancientShard) {
      this.ancientShardValue = this.ancientShard * this.values.ancientShard;
    } else {
      this.ancientShardValue = 0;
    }

    if (this.voidShard) {
      this.voidShardValue = this.voidShard * this.values.voidShard;
    } else {
      this.voidShardValue = 0;
    }

    if (this.sacredShard) {
      this.sacredShardValue = this.sacredShard * this.values.sacredShard;
    } else {
      this.sacredShardValue = 0;
    }

    if (this.rareBook) {
      this.rareBookValue = this.rareBook * this.values.rareBook;
    } else {
      this.rareBookValue = 0;
    }

    if (this.epicBook) {
      this.epicBookValue = this.epicBook * this.values.epicBook;
    } else {
      this.epicBookValue = 0;
    }

    if (this.legendaryBook) {
      this.legendaryBookValue = this.legendaryBook * this.values.legendaryBook;
    } else {
      this.legendaryBookValue = 0;
    }

    if (this.energy) {
      this.energyValue = this.energy * this.values.energy;
    } else {
      this.energyValue = 0;
    }

    if (this.energyRefill) {
      this.energyRefillValue = this.energyRefill * this.values.energyRefill;
    } else {
      this.energyRefillValue = 0;
    }

    if (this.gem) {
      this.gemValue = this.gem * this.values.gem;
    } else {
      this.gemValue = 0;
    }

    if (this.brew) {
      this.brewValue = this.brew * this.values.brew;
    } else {
      this.brewValue = 0;
    }

    if (this.clanBossKey) {
      this.clanBossKeyValue = this.clanBossKey * this.values.clanBossKey;
    } else {
      this.clanBossKeyValue = 0;
    }

    if (this.chicken3) {
      this.chicken3Value = this.chicken3 * this.values.chicken3;
    } else {
      this.chicken3Value = 0;
    }

    if (this.chicken4) {
      this.chicken4Value =  this.chicken4 * this.values.chicken4;
    } else {
      this.chicken4Value =  0;
    }

    if (this.chicken5) {
      this.chicken5Value = this.chicken5 * this.values.chicken5;
    } else {
      this.chicken5Value = 0;
    }

    if (this.silver) {
      this.silverValue = this.silver * this.values.silver;
    } else {
      this.silverValue = 0;
    }

    if (this.exp) {
      this.expValue = this.exp * this.values.exp;
    } else {
      this.expValue = 0;
    }

    this.grandTotal = Math.round(100 *
      (this.ancientShardValue +
      this.voidShardValue +
      this.sacredShardValue +
      this.rareBookValue +
      this.epicBookValue +
      this.legendaryBookValue +
      this.energyValue +
      this.energyRefillValue +
      this.gemValue +
      this.brewValue +
      this.clanBossKeyValue +
      this.chicken3Value +
      this.chicken4Value +
      this.chicken5Value +
      this.silverValue +
      this.expValue)) / 100;

    if (this.grandTotal) {
      this.score = Math.round(100 * (this.grandTotal / this.priceValue)) / 100;
    }
  }
}
