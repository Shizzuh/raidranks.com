import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TeamBuilderService } from './../../services/team-builder.service';
import { Team } from 'src/app/models/team.model';
import { faPencil, faTimes, faPlus } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.scss']
})
export class TeamBuilderComponent implements OnInit {

  builderActive: boolean;
  team: Team;

  faTimes = faTimes;
  faPlus = faPlus;
  faPencil = faPencil;
  champPage: boolean;
  currentChampDetails: any;
  teamPage: boolean;

  constructor(
    private router: Router,
    private teamBuilderService: TeamBuilderService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.router.url === '/teams' ? this.teamPage = true : this.teamPage = false;
      if (event instanceof NavigationEnd) {
        this.team = this.teamBuilderService.getBuilderTeam();
        this.team ? this.builderActive = true : this.builderActive = false;

        setTimeout(() => {
          this.currentChampDetails = this.teamBuilderService.getChampion();
          this.currentChampDetails ? this.champPage = true : this.champPage = false;
        }, 500);
      }
    });
  }

  closeBuilder() {
    this.builderActive = false;
    this.teamBuilderService.closeBuilder();
  }

  addChamp() {
    this.teamBuilderService.addChampToTeam();
    this.team = this.teamBuilderService.getBuilderTeam();
  }

  refreshTeams() {
    this.team = this.teamBuilderService.getBuilderTeam();
  }

}
