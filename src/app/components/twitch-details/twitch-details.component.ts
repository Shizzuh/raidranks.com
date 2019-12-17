
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'twitch-details',
  templateUrl: './twitch-details.component.html',
  styleUrls: ['./twitch-details.component.scss']
})
export class TwitchDetailsComponent implements OnInit {
  twitcherId: any;
  twitcherRef: any;
  twitcher: any;



  constructor(
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    this.loadTwitcher();
  }

  loadTwitcher() {

    this.route.params
      .subscribe(params => {
        this.twitcherId = params['creatorId'];
      });

    this.twitcherRef = this.db
      .collection('twitchers')
      .doc('twitchers')
      .collection('twitchers', ref => ref.where('slug', '==', this.twitcherId));

    this.twitcher = this.twitcherRef.snapshotChanges().pipe(
      map((actions: any) => actions.map(a => {

        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { ...data };
      }))
    );
  }

}



