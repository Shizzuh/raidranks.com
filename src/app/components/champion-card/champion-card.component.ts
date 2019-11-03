import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Champion, Team } from 'src/app/models/team.model';
import { faTrashAlt, faShare, faPlus, faUsersMedical, faCheck } from '@fortawesome/pro-light-svg-icons';
import { TeamBuilderService } from './../../services/team-builder.service';
import { ChampionsService } from 'src/app/services/champions.service';

@Component({
  selector: 'champion-card',
  templateUrl: './champion-card.component.html',
  styleUrls: ['./champion-card.component.scss']
})
export class ChampionCardComponent implements OnInit {

  @Input() champ: Champion;
  @Input() source: string;
  @Input() rosterMode: boolean;
  @Input() removeMode: boolean;
  @Input() index: number;

  @Output() refreshTeams = new EventEmitter<boolean>();
  @Output() reopenEdit = new EventEmitter<boolean>();

  championAddedConfirmation: boolean;
  processing: boolean;
  championPortrait: string;
  championElementIcon: string;
  scrollTarget: HTMLElement;
  team: Team;
  builderActive: boolean;
  teamAtMax: boolean;
  teamBuilderStatus: any;
  champCardStatus: string;
  showChamp: boolean;
  hideChamp: boolean;

  faTrashAlt = faTrashAlt;
  faShare = faShare;
  faPlus = faPlus;
  faUsersMedical = faUsersMedical;
  faCheck = faCheck;

  constructor(
    private teamBuilderService: TeamBuilderService,
    private championsService: ChampionsService
  ) { }

  ngOnInit() {
    this.source === 'shards' ? this.showChamp = false : this.showChamp = true;
    if (this.source === 'shards') {
      setTimeout(() => {
        this.showChamp = true
      }, this.index * 500);
    }
    this.processing = true;
    this.scrollTarget = document.getElementById('content');
    this.championElementIcon = '../../../assets/images/elements/' + this.champ.element.toLowerCase() + '.png'
    this.championPortrait = '../../../assets/images/all/' + this.champ.portrait.toLowerCase() + '.png';
    this.championAddedConfirmation = false;

    this.team = this.teamBuilderService.getBuilderTeam();
    this.team ? this.builderActive = true : this.builderActive = false;

    if (this.team) {
      this.teamAtMax = this.team.champions.length > 4;
    }

    this.teamBuilderStatus = this.teamBuilderService.getIsActive()
      .subscribe(status => {
        this.champCardStatus = status

        if (this.champCardStatus === 'true') {
          this.builderActive === true;
        } else {
          this.builderActive === false;
        }
      });
  }

  removeChamp() {
    this.teamBuilderService.deleteChampFromTeam(this.champ);
    this.refreshTeams.next(true);
    this.reopenEdit.next(true);
    this.showChamp = false;
  }

  addChamp(champ: Champion) {
    this.teamBuilderService.addChampToTeam(champ);
    this.teamBuilderService.setIsActive('true');
    this.team = this.teamBuilderService.getBuilderTeam();
    this.teamBuilderService.setBuilderTeamCount();

    if (this.team) {
      this.teamAtMax = this.team.champions.length > 4;
    }
  }

  addChampToRoster(champ: Champion) {
    this.championsService.addChampToRoster(champ);
    this.championAddedConfirmation = true;
    setTimeout(() => {
      this.championAddedConfirmation = false;
    }, 1500);
  }

  removeChampFromRoster(champ: Champion) {
    this.championsService.removeChampFromRoster(champ);
    this.hideChamp = true;
    this.refreshTeams.next(true);
  }
}
