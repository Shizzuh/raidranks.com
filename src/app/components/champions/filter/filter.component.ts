import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faSearch, faFilter, faTimes } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {

  faSearch = faSearch;
  faFilter = faFilter;
  faTimes = faTimes;

  filterMenuActive: boolean;
  factions: string[];
  orderObj: any;
  filterKeys: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.factions = [
      'Banner Lords',
      'Demonspawn',
      'High Elves',
      'Barbarians',
      'Dark Elves',
      'Skinwalkers',
      'Orcs',
      'Knight Revenant',
      'Lizardmen',
      'Ogryn Tribes',
      'The Sacred Order',
      'Undead Hordes',
      'Dwarves'
    ];
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.orderObj = { ...params.keys, ...params };
      this.filterKeys = this.orderObj.params;
    });
  }

  clearFilter(filterKey) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        [filterKey]: null
      },
      queryParamsHandling: 'merge'
    });
  }

  clearFilters() {
    const params = {
      element: null,
      rarity: null,
      type: null,
      faction: null
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    });

    this.toggleFilterMenu();
  }

  toggleFilterMenu() {
    if (!this.filterMenuActive) {
      this.filterMenuActive = true;
    } else {
      this.filterMenuActive = false;
    }
  }

  addFilter(key: string, value: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        [key]: value
      },
      queryParamsHandling: 'merge'
    });
  }

}
