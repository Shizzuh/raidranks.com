import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamBuilderService } from 'src/app/services/team-builder.service';
import { faPencil, faShield, faPlus, faTrashAlt, faShare } from '@fortawesome/pro-light-svg-icons';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  faShare = faShare;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faShield = faShield;
  faPencil = faPencil;

  teams: Team[];

  @Input() team: Team;
  @Output() refreshTeams = new EventEmitter<boolean>();
  abilities: boolean;
  teamEdit: any;

  constructor(
    private teamBuilderService: TeamBuilderService,
    private router: Router
  ) { }

  ngOnInit() {}

  shareLink(team) {
    this.teamBuilderService.shareLink(team);
  }

  activateBuilder(team: Team) {
    this.teamBuilderService.setTeamBuilderTeam(team);
    this.router.navigate(['./champions']);
  }

  refreshTeamsEv() {
    this.refreshTeams.next(true);
  }

  toggleAbilities() {
    this.abilities ? this.abilities = false : this.abilities = true;
  }

  openEdit() {
    this.teamEdit = true;
  }

  closeEdit() {
    this.teamEdit = false;
    this.refreshTeamsEv();
  }

}
