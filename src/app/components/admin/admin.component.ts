import { ChampionsService } from './../../services/champions.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  fullChampionJson: string;
  from: number;
  to: number;

  constructor(
    private championsService: ChampionsService
  ) { }

  ngOnInit() {
  }

  setFullChampionJson() {
    const from = this.from;
    const to = this.to;
    // this.championsService.setFullChampionList(this.fullChampionJson, from, to);
    this.from = +this.from + 10;
    this.to = +this.to + 10;
  }

}
