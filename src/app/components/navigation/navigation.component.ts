import { Component, OnInit } from '@angular/core';
import {
  faSwords,
  faUsersMedical,
  faBars,
  faUsdCircle,
  faTimes,
  faDrumstick,
  faUsers
} from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faSwords = faSwords;
  faUsersMedical = faUsersMedical;
  faBars = faBars;
  faUsdCircle = faUsdCircle;
  faTimes = faTimes;
  faDrumstick = faDrumstick;
  faUsers = faUsers;
  navigationActive: boolean;

  constructor() { }

  ngOnInit() {
  }

  toggleNav() {
    this.navigationActive ? this.navigationActive = false : this.navigationActive = true;
  }

}
