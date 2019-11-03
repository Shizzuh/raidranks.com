import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamBuilderService } from 'src/app/services/team-builder.service';
import { Team } from 'src/app/models/team.model';
import { faPencil, faTrashAlt, faTimes, faCheck } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {

  @Input() team: Team;
  @Output() closeEdit = new EventEmitter<boolean>();
  @Output() refreshTeams = new EventEmitter<boolean>();
  @Output() openEdit = new EventEmitter<boolean>();

  teams: Team[];

  faPencil = faPencil;
  faTimes = faTimes;
  faCheck = faCheck;
  faTrashAlt = faTrashAlt;
  deleteConfirmation: boolean;
  teamNameSaved: boolean;

  constructor(
    private teamBuilderService: TeamBuilderService
  ) { }

  ngOnInit() { }

  refreshTeam() {
    this.refreshTeams.next(true);
  }

  renameTeam(e) {
    const newTeamName = e.target.value;
    this.teamBuilderService.renameName(this.team, newTeamName);
    this.teamNameSaved = true;
    setTimeout(() => {
      this.teamNameSaved = false;
    }, 1500);
  }

  reopenEdit() {
    this.openEdit.next(true);
  }

  close() {
    this.closeEdit.next(true);
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

  refreshTeamsEv() {
    this.refreshTeams.next(true);
  }

}
