import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Champion, Team } from 'src/app/models/team.model';
import { faTrashAlt, faShare, faPlus, faUsersMedical } from '@fortawesome/pro-light-svg-icons';
import { TeamBuilderService } from './../../services/team-builder.service';

@Component({
  selector: 'champion-card',
  templateUrl: './champion-card.component.html',
  styleUrls: ['./champion-card.component.scss']
})
export class ChampionCardComponent implements OnInit, AfterViewInit {

  @Input() champ: Champion;
  @Input() source: string;

  @Output() refreshTeams = new EventEmitter<boolean>();

  processing: boolean;
  championPortrait: string;
  championElementIcon: string;
  scrollTarget: HTMLElement;
  faTrashAlt = faTrashAlt;
  faShare = faShare;
  faPlus = faPlus;
  faUsersMedical = faUsersMedical;
  team: Team;
  builderActive: boolean;
  teamAtMax: boolean;
  teamBuilderStatus: any;
  champCardStatus: string;

  constructor(
    private teamBuilderService: TeamBuilderService
  ) { }

  ngOnInit() {
    this.processing = true;
    this.scrollTarget = document.getElementById('content');
    this.championElementIcon = '../../../assets/images/elements/' + this.champ.element.toLowerCase() + '.png'
    this.championPortrait = '../../../assets/images/champions/' + this.champ.portrait.toLowerCase() + '.png';

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

  ngAfterViewInit() {}

  removeChamp() {
    this.teamBuilderService.deleteChampFromTeam(this.champ);
    this.refreshTeams.next(true);
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
}
