import { Storage } from './store.service';
import { Injectable } from '@angular/core';
import { Team, Champion } from './../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamBuilderService {

  constructor(
    private localStorage: Storage
  ) { }

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

  addChampToTeam() {
    const team = this.getBuilderTeam();
    const champ = this.getChampion();

    if (!this.getTeams()) {
      return 'No teams to add a champion to';
    }

    const originalTeams = JSON.stringify(this.getTeams());
    const originalTeam = JSON.stringify(team);

    team.champions.push(champ);
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

  activateBuilder(team: Team) {
    this.localStorage.set('rslTeamBuilder', team);
  }

  getBuilderTeam() {
    return this.localStorage.get('rslTeamBuilder');
  }

  getChampion() {
    return this.localStorage.get('rslTeamBuilderChampion');
  }

  setChampion(champ: Champion) {
    this.localStorage.set('rslTeamBuilderChampion', champ);
  }

  unsetChampion() {
    this.localStorage.set('rslTeamBuilderChampion', null);
  }

  closeBuilder() {
    this.localStorage.set('rslTeamBuilder', null);
  }
}
