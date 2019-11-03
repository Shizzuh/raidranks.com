import { Storage } from './../../services/store.service';
import { ChampionsService } from 'src/app/services/champions.service';
import { Component, OnInit } from '@angular/core';
import { Champion } from 'src/app/models/team.model';
import * as _ from 'lodash';

@Component({
  selector: 'shards',
  templateUrl: './shards.component.html',
  styleUrls: ['./shards.component.scss']
})
export class ShardsComponent implements OnInit {

  championsList: Champion[];
  randomChamps: Champion[] = [];
  legendaryChampions: Champion[];
  epicChampions: Champion[];
  rareChampions: Champion[];
  onCoolDown: boolean;
  numberOfSummons: number;
  showBluestacks: boolean;
  bluestacksCount: number;

  constructor(
    private championsService: ChampionsService,
    private localStorage: Storage
  ) { }

  ngOnInit() {
    this.showBluestacks = false;
    this.bluestacksCount = +localStorage.getItem('bluestacksCount');
    if (this.bluestacksCount && this.bluestacksCount === 10) {
      this.showBluestacks = true;
    }
    this.onCoolDown = false;
    this.championsList = this.championsService.getAllChampions();
    this.legendaryChampions = _.filter(this.championsList, ['rarity', 'Legendary']);
    this.epicChampions = _.filter(this.championsList, ['rarity', 'Epic']);
    this.rareChampions = _.filter(this.championsList, ['rarity', 'Rare']);
  }

  summon(shardCount: number, chances: number) {
    this.bluestacksCount++;
    localStorage.setItem('bluestacksCount', this.bluestacksCount + '');
    this.bluestacksCount = +localStorage.getItem('bluestacksCount');
    if (this.bluestacksCount && this.bluestacksCount === 10) {
      this.showBluestacks = true;
      return;
    } else {
      this.showBluestacks = false;
    }
    this.onCoolDown = true;
    this.randomChamps = [];
    for (let i = 1; i <= shardCount; i++ ) {
      if (this.getRandomNumber() <= 0.5 * chances) {
        this.getRandomChampionIndex(this.legendaryChampions);
      } else if (this.getRandomNumber() <= 8 * chances) {
        this.getRandomChampionIndex(this.epicChampions);
      } else {
        this.getRandomChampionIndex(this.rareChampions);
      }
    }
    setTimeout(() => {
      this.onCoolDown = false;
    }, 5000);
  }

  getRandomNumber() {
    return Math.round(Math.random() * 10000) / 100;
  }

  getRandomChampionIndex(champions: Champion[]) {
    let randomIndex =  Math.round(Math.random() * champions.length - 1);
    randomIndex < 0 ? randomIndex = 0 : randomIndex = randomIndex;
    if (champions[randomIndex].element === undefined) {
    }
    this.randomChamps.push(champions[randomIndex]);
  }

  closeBluestacks(resetCount: boolean) {
    this.showBluestacks = false;
    if (!resetCount) {
      localStorage.setItem('bluestacksCount', this.bluestacksCount + '');
      this.bluestacksCount = +localStorage.getItem('bluestacksCount');
      return;
    }
    if (resetCount) {
      localStorage.setItem('bluestacksCount', '0');
      this.bluestacksCount = +localStorage.getItem('bluestacksCount');
    }
  }

}
