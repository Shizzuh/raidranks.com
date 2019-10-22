import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DisqusModule } from 'ngx-disqus';
import { AdsenseModule } from 'ng2-adsense';
import { NgxInViewportModule } from '@ngx-lite/in-viewport';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { StorageModule } from '@ngx-pwa/local-storage';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { InViewportModule } from '@thisissoon/angular-inviewport';
import { InputSearchModule } from 'ngx-input-search';
import { ClipboardModule } from 'ngx-clipboard';
import * as component from './components';


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
    component.TeamComponent
  ],
  imports: [
    ClipboardModule,
    InViewportModule,
    BrowserModule,
    InputSearchModule,
    FormsModule,
    LazyLoadImageModule,
    VirtualScrollerModule,
    FontAwesomeModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
