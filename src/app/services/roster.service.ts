import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Storage } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  activatedRoute: ActivatedRoute;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private localStorage: Storage
  ) { }


  shareLink(team) {
    const dbRef = this.db.doc('teams/' + team.id);
    dbRef.set(team, { merge: true }).then(success => {
      const queryParams = { teamId: team.id };
      this.router.navigate(
        ['/team-share'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      });
    }).catch(err => {
      console.log('Failed to add hero - ' + err);
    })
  }
}
