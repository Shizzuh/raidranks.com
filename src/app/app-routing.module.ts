import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as component from './components';

const routes: Routes = [
  { path: '', component: component.HomeComponent },
  { path: 'champions', component: component.ChampionsComponent },
  { path: 'champion-details/:faction/:champion', component: component.ChampionDetailsComponent },
  { path: 'teams', component: component.TeamsComponent },
  { path: 'leaderboards', component: component.CbLeaderboardComponent },
  { path: 'team-share', component: component.TeamShareComponent },
  { path: 'deals', component: component.DealsComponent },
  { path: 'food', component: component.FoodComponent },
  { path: 'admin', component: component.AdminComponent },
  { path: 'faq', component: component.FaqComponent },
  { path: 'roster', component: component.RosterComponent },
  { path: 'roster-share', component: component.RosterShareComponent },
  { path: 'shards', component: component.ShardsComponent },
  { path: 'tierlist', component: component.TierlistComponent},
  { path: 'stier', component: component.StierComponent},
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
