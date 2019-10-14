import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Champion } from 'src/app/models/team.model';
import { faTrashAlt, faShare } from '@fortawesome/pro-light-svg-icons';
import { TeamBuilderService } from './../../services/team-builder.service';

@Component({
  selector: 'champion-card',
  templateUrl: './champion-card.component.html',
  styleUrls: ['./champion-card.component.scss']
})
export class ChampionCardComponent implements OnInit, AfterViewInit {

  @Input() champ: Champion;
  @Input() source: string;

  @Output() refreshTeams = new EventEmitter<string>();

  processing: boolean;
  championPortrait: string;
  championElementIcon: string;
  scrollTarget: HTMLElement;
  faTrashAlt = faTrashAlt;
  faShare = faShare;

  constructor(
    private teamBuilderService: TeamBuilderService
  ) { }

  ngOnInit() {
    this.processing = true;
    this.scrollTarget = document.getElementById('content');
    this.championElementIcon = '../../../assets/images/elements/' + this.champ.element.toLowerCase() + '.png'
    this.championPortrait = '../../../assets/images/champions/' + this.champ.portrait.toLowerCase() + '.png';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.processing = false;
    }, 0);
  }

  removeChamp() {
    this.teamBuilderService.deleteChampFromTeam(this.champ);
    this.refreshTeams.next('refreshTeams');
  }
}
