import { Injectable } from '@angular/core';
import { Storage } from './store.service';
import { Champion } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {

  championCollection: any;
  champions: any;
  championsDocuments: any;
  factions: any;
  factionCollection: any;
  factionsList: any;
  championJson: any;

  constructor(
    private localStorage: Storage
  ) { }

  getAllChampions() {
    return this.localStorage.get('championFlatList')
  }

  getChampionsRoster() {
    return this.localStorage.get('championRoster')
  }

  setChampionsRoster(roster) {
    this.localStorage.set('championRoster', roster)
  }

  addChampToRoster(champ: Champion) {
    if (!this.getChampionsRoster()) {
      this.createRoster();
    }
    const championRoster = this.getChampionsRoster();
    championRoster[0].champions.push(champ);
    this.localStorage.set('championRoster', championRoster);
  }

  removeChampFromRoster(champ: Champion) {
    const championRoster = this.getChampionsRoster();
    const _championRoster = JSON.stringify(championRoster);
    const _champ = JSON.stringify(champ);

    const _updatedRoster = _championRoster
      .replace(_champ, '')
      .replace(',,', ',')
      .replace('[,', '[')
      .replace(',]', ']');
    const updatedRoster = JSON.parse(_updatedRoster);
    this.localStorage.set('championRoster', updatedRoster);
  }

  createRoster() {
    this.localStorage.set('championRoster', [{
      id: Math.floor((Math.random() * 9999999999) + 999999999),
      champions: []
    }]);
  }
}
