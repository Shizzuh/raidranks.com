import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamBuilderService } from 'src/app/services/team-builder.service';
import { Team } from 'src/app/models/team.model';
import { faTrashAlt, faShare, faPlus } from '@fortawesome/pro-light-svg-icons';
import { GaService } from 'src/app/services/ga.service';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teamName: string;
  teams: Team[];

  faShare = faShare;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  deleteConfirmation: boolean;
  helpOverlayIsActive: boolean;

  constructor(
    private ga: GaService,
    private teamBuilderService: TeamBuilderService
  ) { }

  ngOnInit() {
    this.teams = this.teamBuilderService.getTeams();
  }

  createNewTeam() {
    this.ga.eventEmitter('Team Builder', 'Create Team', 'createNewTeam', this.teamName);
    const team = {
      name: this.teamName,
      id: Math.floor((Math.random() * 9999999999) + 999999999),
      champions: []
    }
    this.teamBuilderService.addTeam(team);
    this.teams = this.teamBuilderService.getTeams();
    this.teamName = null;
  }

  refreshTeams(ev: any) {
    this.teams = this.teamBuilderService.getTeams();
  }

  helpOverlay() {
    this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
  }

}
