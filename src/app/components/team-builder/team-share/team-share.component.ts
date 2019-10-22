import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Team } from 'src/app/models/team.model';
import { ClipboardService } from 'ngx-clipboard'
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'team-share',
  templateUrl: './team-share.component.html',
  styleUrls: ['./team-share.component.scss']
})
export class TeamShareComponent implements OnInit {

  teamObj: Params;
  teamId: string;
  championCollection: any;
  team: Observable<Team>;
  shareLink: string;
  copied: boolean;
  faCheck = faCheck;

  constructor(
    private clipboardService: ClipboardService,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) { }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {
      this.teamObj = { ...params };
      this.teamId = this.teamObj.params.teamId;
    });

    this.championCollection = this.db.collection('teams', ref => ref.where('id', '==', +this.teamId));

    this.team = this.championCollection.snapshotChanges()
      .pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );

    this.shareLink = location.href;
  }

  copyTeamUrl(url: string) {
    this.clipboardService.copyFromContent(url);
    this.copied = true;
  }

}
