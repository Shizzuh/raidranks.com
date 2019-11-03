import { ChampionsService } from './../../services/champions.service';
import { Storage } from './../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { faSearch, faFilter } from '@fortawesome/pro-light-svg-icons';
import * as _ from 'lodash';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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
  orderObj: any;

  faSearch = faSearch;
  faFilter = faFilter;
  championsListPage: boolean;
  rosterMode: any;

  constructor(
    private championsService: ChampionsService,
    private localStorage: Storage,
    private db: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.checkRosterMode();

    this.championsService.getAllChampions();

    if (localStorage.getItem('championFlatList')) {
      this.championList = _.orderBy(
        this.localStorage.get('championFlatList'), ['faction', 'rarity', 'name'], ['asc', 'asc', 'asc']
      );
    } else {
      this.championFlatList = this.db.collection('championsV2');
      this.championFlatList = this.championFlatList.snapshotChanges()
        .pipe(
          map((actions: any) => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );

      this.championFlatList.subscribe(resp => {
        console.log(resp);
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


    this.route.queryParamMap.subscribe(params => {
      this.orderObj = { ...params.keys, ...params };
      this.championList = _.filter(this.localStorage.get('championFlatList'), this.orderObj.params);
    });


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRosterMode();
      }
    });
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

  checkRosterMode() {
    this.router.url === '/champions' ? this.championsListPage = true : this.championsListPage = false;
    if (this.championsListPage) {
      this.rosterMode = this.localStorage.get('rosterMode');
    } else {
      this.rosterMode = false;
    }

  }
}
