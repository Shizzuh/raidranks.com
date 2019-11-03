import { ChampionsService } from './../../services/champions.service';
import { Storage } from './../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { faSearch, faFilter, faPlus } from '@fortawesome/pro-light-svg-icons';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Champion } from 'src/app/models/team.model';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  championRoster: Champion[];
  championList: Champion[];
  originalChampionList: Champion[];
  searchInput: string;
  filterMenuActive: boolean;
  orderObj: any;

  faSearch = faSearch;
  faFilter = faFilter;
  faPlus = faPlus;
  removeMode: boolean;

  constructor(
    private championsService: ChampionsService,
    private localStorage: Storage,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.removeMode = false;
    this.championsService.getAllChampions();
    if (this.localStorage.get('championRoster')) {
      this.originalChampionList = this.localStorage.get('championRoster')[0].champions;
    }

    if (localStorage.getItem('championRoster')) {
      this.championList = _.orderBy(
        this.localStorage.get('championRoster')[0].champions, ['faction', 'rarity', 'name'], ['asc', 'asc', 'asc']
      );

    }

    this.route.queryParamMap.subscribe(params => {
      this.orderObj = { ...params.keys, ...params };
      this.championList = _.filter(this.originalChampionList, this.orderObj.params);
    });
  }

  updateSearch($event: Event) {
    const stringEmitted = ($event.target as HTMLInputElement).value.toLowerCase();
    this.championList = _.filter(this.originalChampionList, (item: any) => {
      return item.name.indexOf(stringEmitted) > -1;
    });
  }

  emptyCheck() {
    const stringEmitted = this.searchInput;
    if (stringEmitted.length === 0) {
      this.championList = _.orderBy(
        this.originalChampionList, ['faction', 'name'], ['asc', 'asc', 'asc']
      );
    } else {
      return;
    }
  }

  addChampionsToRoster() {
    this.localStorage.set('rosterMode', true);
    this.router.navigate(['./champions']);
  }

  refreshRoster() {
    this.championList = _.orderBy(
      this.localStorage.get('championRoster')[0].champions, ['faction', 'name'], ['asc', 'asc', 'asc']
    );
  }
}
