import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TeamBuilderService } from './../../services/team-builder.service';
import { Team } from 'src/app/models/team.model';
import { faTrashAlt, faShare } from '@fortawesome/pro-light-svg-icons';

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

  constructor(
    private teamBuilderService: TeamBuilderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.teams = this.teamBuilderService.getTeams();
  }

  createNewTeam() {
    const team = {
      name: this.teamName,
      id: Math.floor((Math.random() * 9999999999) + 999999999),
      champions: []
    }
    this.teamBuilderService.addTeam(team);
    this.teams = this.teamBuilderService.getTeams();
    this.teamName = null;
  }

  deleteTeam(team: Team) {
    this.teamBuilderService.deleteTeam(team);
    this.teams = this.teamBuilderService.getTeams();
  }

  activateBuilder(team: Team) {
    this.teamBuilderService.activateBuilder(team);
    this.router.navigate(['./champions']);
  }

  refreshTeams() {
    this.teams = this.teamBuilderService.getTeams();
  }

}
