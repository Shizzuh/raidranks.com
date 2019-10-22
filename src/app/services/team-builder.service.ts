import { Storage } from './store.service';
import { Injectable } from '@angular/core';
import { Team, Champion } from './../models/team.model';
import { Subject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Params } from '@fortawesome/fontawesome-svg-core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeamBuilderService {

  champion: Champion;
  activatedRoute: ActivatedRoute;
  private isActive = new Subject<string>();
  private teamCount = new Subject<number>();

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private localStorage: Storage
    ) {}



  getIsActive(): Observable<string> {
    return this.isActive.asObservable();
  }

  setIsActive(status: string) {
    this.isActive.next(status);
  }



  getBuilderTeamCount(): Observable<number> {
    return this.teamCount.asObservable();
  }

  setBuilderTeamCount() {
    const team = this.getBuilderTeam();
    if (team) {
      const teamCount = team.champions.length;
      this.teamCount.next(teamCount);
    }
  }


  shareLink(team) {

    const dbRef = this.db.doc('teams/' + team.id);
    dbRef.set(team, { merge: true }).then(success => {
      const queryParams = { teamId: team.id };
      this.router.navigate(
        ['/team-share'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      });
    }).catch(err => {
      console.log('Failed to add hero - ' + err);
    })
  }


  getTeams() {
    return this.localStorage.get('rslTeams');
  }

  deleteTeams() {
    return this.localStorage.set('rslTeams', null);
  }

  addTeam(team: Team) {
    if (!this.getTeams()) {
      const emptyTeams = [];
      emptyTeams.push(team);
      this.localStorage.set('rslTeams', emptyTeams);
      return;
    }

    const teams = this.getTeams();
    teams.push(team);
    this.localStorage.set('rslTeams', teams);
  }

  deleteTeam(team: Team) {
    if (!this.getTeams()) {
      return 'No teams to delete';
    }

    const teamToDelete = JSON.stringify(team);
    const teams = JSON.stringify(this.getTeams());
    let updatedTeams = teams.replace(teamToDelete, '');
    updatedTeams = updatedTeams
      .replace(',,', ',')
      .replace('[,', '[')
      .replace(',]', ']');
    this.localStorage.set('rslTeams', JSON.parse(updatedTeams));
  }

  addChampToTeam(champ: Champion) {
    champ ? this.champion = champ : this.champion = this.getChampion();

    const team = this.getBuilderTeam();

    if (!this.getTeams()) {
      return 'No teams to add a champion to';
    }

    const originalTeams = JSON.stringify(this.getTeams());
    const originalTeam = JSON.stringify(team);

    team.champions.push(this.champion);
    let updatedTeam = JSON.stringify(team);

    this.localStorage.set('rslTeamBuilder', JSON.parse(updatedTeam));
    updatedTeam = originalTeams.replace(originalTeam, updatedTeam);
    this.localStorage.set('rslTeams', JSON.parse(updatedTeam));
  }

  deleteChampFromTeam(champ: Champion) {
    if (!this.getTeams()) {
      return 'No teams to delete a champion from';
    }
    const champToDelete = JSON.stringify(champ);
    const teams = JSON.stringify(this.getTeams());
    let updatedTeams = teams.replace(champToDelete, '');
    updatedTeams = updatedTeams
      .replace(',,', ',')
      .replace('[,', '[')
      .replace(',]', ']');
    this.localStorage.set('rslTeams', JSON.parse(updatedTeams));
  }

  setTeamBuilderTeam(team: Team) {
    this.localStorage.set('rslTeamBuilder', team);
  }

  getBuilderTeam(): Team {
    return this.localStorage.get('rslTeamBuilder');
  }

  getChampion(): Champion {
    return this.localStorage.get('rslTeamBuilderChampion');
  }

  setChampion(champ: Champion) {
    this.localStorage.set('rslTeamBuilderChampion', champ);
  }

  unsetChampion() {
    this.localStorage.set('rslTeamBuilderChampion', null);
  }

  closeBuilder() {
    this.setIsActive('false');
  }
}
