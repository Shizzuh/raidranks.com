import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DisqusModule } from 'ngx-disqus';
import { AdsenseModule } from 'ng2-adsense';
import { NgxInViewportModule } from '@ngx-lite/in-viewport';
import { NgxPicaModule } from 'ngx-pica';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { StorageModule } from '@ngx-pwa/local-storage';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { InputSearchModule } from 'ngx-input-search';
import { ClipboardModule } from 'ngx-clipboard';
import * as component from './components';
import { CbLeaderboardComponent } from './components/cb-leaderboard/cb-leaderboard.component';
import { SubmitScoreComponent } from './components/cb-leaderboard/submit-score/submit-score.component';
import { ScoreComponent } from './components/cb-leaderboard/score/score.component';
import { HomeComponent } from './components/home/home.component';
import { TierlistComponent } from './components/tierlist/tierlist.component';
import { StierComponent } from './components/stier/stier.component';
import { AscensionCalcComponent } from './components/ascension-calc/ascension-calc.component';
import { GuidesComponent } from './components/guides/guides.component';
import { GuideFarmingComponent } from './components/guides/guide-farming/guide-farming.component';
import { ContentcreatorsComponent } from './components/contentcreators/contentcreators.component';
import { CreatorDetailsComponent } from './components/creator-details/creator-details.component';
import { GuideGearingComponent } from './components/guides/guide-gearing/guide-gearing.component';

@NgModule({
  declarations: [
    AppComponent,
    component.NavigationComponent,
    component.ChampionCardComponent,
    component.TeamsComponent,
    component.TeamBuilderComponent,
    component.ValueCalcComponent,
    component.RankCalcComponent,
    component.ChampionsComponent,
    component.SearchComponent,
    component.ChampionDetailsComponent,
    component.SpinnerComponent,
    component.DealsComponent,
    component.FilterComponent,
    component.FoodComponent,
    component.TeamShareComponent,
    component.TeamComponent,
    component.TeamAbilitiesComponent,
    component.AdminComponent,
    component.TeamEditComponent,
    component.RosterComponent,
    component.SidebarComponent,
    component.FaqComponent,
    component.ShardsComponent,
    component.RosterShareComponent,
    component.TwitchDetailsComponent,
    component.TwitchStreamersComponent,
    CbLeaderboardComponent,
    SubmitScoreComponent,
    ScoreComponent,
    HomeComponent,
    TierlistComponent,
    StierComponent,
    AscensionCalcComponent,
    GuidesComponent,
    GuideFarmingComponent,
    ContentcreatorsComponent,
    CreatorDetailsComponent,
    GuideGearingComponent,
  ],
  imports: [
    ClipboardModule,
    InViewportModule,
    BrowserModule,
    InputSearchModule,
    FormsModule,
    NgxPicaModule,
    LazyLoadImageModule,
    VirtualScrollerModule,
    FontAwesomeModule,
    AppRoutingModule,
    AngularFireStorageModule,
    AngularFireModule,
    AngularFirestoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    NgxInViewportModule,
    InfiniteScrollModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    DisqusModule.forRoot('raidranks'),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2485646423395791',
      adSlot: 7259870550,
    }),
    StorageModule.forRoot({ IDBNoWrap: true }),
    NoopAnimationsModule,
  ],
  providers: [
    // { provide: StorageBucket, useValue: 'cb-leaderboards' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
