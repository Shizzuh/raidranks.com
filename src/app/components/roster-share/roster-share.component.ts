import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Team, Champion } from 'src/app/models/team.model';
import { ClipboardService } from 'ngx-clipboard'
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'roster-share',
  templateUrl: './roster-share.component.html',
  styleUrls: ['./roster-share.component.scss']
})
export class RosterShareComponent implements OnInit {

  rosterObj: Params;
  rosterId: string;
  championCollection: any;
  roster: Observable<Champion[]>;
  shareLink: string;
  copied: boolean;
  faCheck = faCheck;
  rosterLegendary: any;
  rosterEpic: any;
  rosterRare: any;
  rosterUncommon: any;
  rosterCommon: any;

  constructor(
    private clipboardService: ClipboardService,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.rosterObj = { ...params };
      this.rosterId = this.rosterObj.params.rosterId;
    });

    this.championCollection = this.db.collection('rosters', ref => ref.where('id', '==', +this.rosterId));

    this.roster = this.championCollection.snapshotChanges()
      .pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      ).subscribe(roster => {
        this.rosterLegendary = _.orderBy(_.filter(roster[0].champions, ['rarity', 'Legendary']), ['faction', 'name']);
        this.rosterEpic = _.orderBy(_.filter(roster[0].champions, ['rarity', 'Epic']), ['faction', 'name']);
        this.rosterRare = _.orderBy(_.filter(roster[0].champions, ['rarity', 'Rare']), ['faction', 'name']);
        this.rosterUncommon = _.orderBy(_.filter(roster[0].champions, ['rarity', 'Uncommon']), ['faction', 'name']);
        this.rosterCommon = _.orderBy(_.filter(roster[0].champions, ['rarity', 'Common']), ['faction', 'name']);
      });

    this.shareLink = location.href;
  }

  copyRosterUrl(url: string) {
    this.clipboardService.copyFromContent(url);
    this.copied = true;
  }

}
