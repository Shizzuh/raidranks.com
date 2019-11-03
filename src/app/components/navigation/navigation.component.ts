import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  faSwords,
  faTrashAlt,
  faUsersMedical,
  faBars,
  faUsdCircle,
  faTimes,
  faDrumstick,
  faUsers,
  faPlus,
  faShareAlt,
  faQuestion
} from '@fortawesome/pro-light-svg-icons';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Storage } from '../../services/store.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faSwords = faSwords;
  faTrashAlt = faTrashAlt;
  faUsersMedical = faUsersMedical;
  faBars = faBars;
  faPlus = faPlus;
  faUsdCircle = faUsdCircle;
  faShareAlt = faShareAlt;
  faTimes = faTimes;
  faQuestion = faQuestion;
  faDrumstick = faDrumstick;
  faUsers = faUsers;
  navigationActive: boolean;
  rosterMode: any;
  championsListPage: boolean;
  rosterPage: boolean;
  removeMode: boolean;
  orderObj: any;

  constructor(
    private localStorage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.orderObj = { ...params.keys, ...params };
      this.removeMode = JSON.stringify(this.orderObj).includes('removeMode');
    });

    this.router.events.subscribe(event => {
      this.router.url === '/champions' ? this.championsListPage = true : this.championsListPage = false;
      this.router.url.includes('/roster') ? this.rosterPage = true : this.rosterPage = false;
      if (event instanceof NavigationEnd) {
        if (this.championsListPage) {
          this.rosterMode = this.checkRosterMode();
        } else {
          this.rosterMode = false;
        }
      }
    });
  }

  checkRosterMode() {
    return this.localStorage.get('rosterMode');
  }

  toggleNav() {
    this.navigationActive ? this.navigationActive = false : this.navigationActive = true;
  }

  exitRosterMode() {
    this.localStorage.set('rosterMode', false);
    this.rosterMode = false;
    this.router.navigate(['./roster']);
  }

  addChampionsToRoster() {
    this.localStorage.set('rosterMode', true);
    this.router.navigate(['./champions']);
  }

  removeChampionsFromRoster() {
    this.router.navigate(['./roster'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        'removeMode': true
      },
      queryParamsHandling: 'merge'
    });
  }

  shareRoster() {

  }

}
