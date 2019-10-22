import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as component from './components';

const routes: Routes = [
  { path: '', component: component.ChampionsComponent },
  { path: 'champions', component: component.ChampionsComponent },
  { path: 'champion-details/:faction/:champion', component: component.ChampionDetailsComponent },
  { path: 'teams', component: component.TeamsComponent },
  { path: 'team-share', component: component.TeamShareComponent },
  { path: 'deals', component: component.DealsComponent },
  { path: 'food', component: component.FoodComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
