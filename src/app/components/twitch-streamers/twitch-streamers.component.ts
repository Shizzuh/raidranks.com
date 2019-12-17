import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'twitch-streamers',
  templateUrl: './twitch-streamers.component.html',
  styleUrls: ['./twitch-streamers.component.scss']
})
export class TwitchStreamersComponent implements OnInit {
  twitchers: any;

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.twitchers = this.db.collection('twitchers');
    this.twitchers = this.twitchers.snapshotChanges()
      .pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

}
