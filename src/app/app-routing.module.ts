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
  { path: 'ascension-calc', component: component.AscensionCalcComponent},
  { path: 'admin', component: component.AdminComponent },
  { path: 'faq', component: component.FaqComponent },
  { path: 'roster', component: component.RosterComponent },
  { path: 'roster-share', component: component.RosterShareComponent },
  { path: 'shards', component: component.ShardsComponent },
  { path: 'tierlist', component: component.TierlistComponent},
  { path: 'stier', component: component.StierComponent},
  { path: 'guides', component: component.GuidesComponent},
  { path: 'guide-farming', component: component.GuideFarmingComponent},
  { path: 'guide-gearing', component: component.GuideGearingComponent},
  { path: 'content-creators', component: component.ContentcreatorsComponent },
  { path: 'twitch-streamers', component: component.TwitchStreamersComponent },
  { path: 'content-creators/:creatorId', component: component.CreatorDetailsComponent },
  { path: 'twitch-streamers/:twitcherId', component: component.TwitchDetailsComponent },
  { path: 'news-page', component: component.NewsPageComponent },
  { path: 'news-page/:newsId', component: component.NewsPageComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
