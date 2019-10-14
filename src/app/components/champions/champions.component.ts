import { Storage } from './../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons';
import * as _ from 'lodash';

@Component({
  selector: 'champions',
  templateUrl: './champions.component.html',
  styleUrls: ['./champions.component.scss']
})
export class ChampionsComponent implements OnInit {

  championFlatList: any;
  championList: any;
  searchInput: string;
  filterMenuActive: boolean;

  faSearch = faSearch;
  faFilter = faFilter;

  constructor(
    private localStorage: Storage,
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    if (localStorage.getItem('championFlatList')) {
      this.championList = _.orderBy(
        this.localStorage.get('championFlatList'), ['faction', 'rarity', 'name'], ['asc', 'asc', 'asc']
      );
      return;
    } else {

      this.championFlatList = this.db.collection('championsV2');
      this.championFlatList = this.championFlatList.snapshotChanges().pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      this.championFlatList.subscribe(resp => {
        resp.map(champions => {
          champions.champions.map(champ => {
            champ.name = champ.name.toLowerCase();
          })
          this.localStorage.set('championFlatList', champions.champions);
          this.championList = _.orderBy(
            this.localStorage.get('championFlatList'), ['faction', 'rarity', 'name'], ['asc', 'asc', 'asc']
          );
        })
      })
    }
  }

  updateSearch($event: Event) {
    const stringEmitted = ($event.target as HTMLInputElement).value.toLowerCase();
    this.championList = _.filter(this.localStorage.get('championFlatList'), (item: any) => {
      return item.name.indexOf(stringEmitted) > -1;
    });
  }

  emptyCheck() {
    const stringEmitted = this.searchInput;
    if (stringEmitted.length === 0) {
      this.championList = _.orderBy(
        this.localStorage.get('championFlatList'), ['faction', 'name'], ['asc', 'asc', 'asc']
      );
    } else {
      return;
    }
  }
}
