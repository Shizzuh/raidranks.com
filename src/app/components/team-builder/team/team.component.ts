import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamBuilderService } from 'src/app/services/team-builder.service';
import { faTrashAlt, faShare } from '@fortawesome/pro-light-svg-icons';
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

  deleteConfirmation: boolean;
  teams: Team[];

  @Input() team: Team;
  @Output() refreshTeams = new EventEmitter<boolean>();

  constructor(
    private teamBuilderService: TeamBuilderService,
    private router: Router
  ) { }

  ngOnInit() {}

  shareLink(team) {
    this.teamBuilderService.shareLink(team);
  }

  deleteTeamConfirmation() {
    this.deleteConfirmation ? this.deleteConfirmation = false : this.deleteConfirmation = true;
  }

  deleteTeam(team: Team) {
    this.teamBuilderService.deleteTeam(team);
    this.teams = this.teamBuilderService.getTeams();
    this.deleteConfirmation = true;
    this.refreshTeamsEv();
  }

  activateBuilder(team: Team) {
    this.teamBuilderService.setTeamBuilderTeam(team);
    this.router.navigate(['./champions']);
  }

  refreshTeamsEv() {
    this.refreshTeams.next(true);
  }

}
