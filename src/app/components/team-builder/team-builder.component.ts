import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TeamBuilderService } from './../../services/team-builder.service';
import { Team } from 'src/app/models/team.model';
import { faPencil, faTimes, faPlus } from '@fortawesome/pro-light-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'team-builder',
  templateUrl: './team-builder.component.html',
  styleUrls: ['./team-builder.component.scss']
})
export class TeamBuilderComponent implements OnInit, OnDestroy, AfterViewInit {


  faTimes = faTimes;
  faPlus = faPlus;
  faPencil = faPencil;
  champPage: boolean;
  currentChampDetails: any;
  teamPage: boolean;
  teamBuilderStatus: any;
  champCardStatus: string;
  teamAtMax: boolean;
  teamCount: Observable<number>;
  builderActive: boolean;
  team: Team;

  constructor(
    private router: Router,
    private teamBuilderService: TeamBuilderService
  ) { }

  ngOnInit() {

    this.router.events.subscribe(event => {
      this.router.url === '/teams' ? this.teamPage = true : this.teamPage = false;
      if (event instanceof NavigationEnd) {

        this.team = this.teamBuilderService.getBuilderTeam();

        if (this.team) {
          this.team ? this.builderActive = true : this.builderActive = false;
        }

        this.currentChampDetails = this.teamBuilderService.getChampion();
        location.pathname.includes('/champion-details') ? this.champPage = true : this.champPage = false;

      }
    });

  }

  closeBuilder() {
    this.teamBuilderService.setTeamBuilderTeam(null);
    this.builderActive = false;
  }

  addChamp() {
    this.teamBuilderService.addChampToTeam(null);
    this.team = this.teamBuilderService.getBuilderTeam();
  }

  refreshTeams() {
    this.team = this.teamBuilderService.getBuilderTeam();
  }

  ngOnDestroy() {}

  ngAfterViewInit() {}

}
