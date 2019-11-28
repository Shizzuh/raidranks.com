import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Storage } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  activatedRoute: ActivatedRoute;
  roster: any;
  rosterId: any;

  constructor(
    private router: Router,
    private db: AngularFirestore,
    private localStorage: Storage
  ) { }

  shareLink() {
    this.roster = this.localStorage.get('championRoster');
    this.rosterId = this.roster[0].id;

    const dbRef = this.db.doc('rosters/' + this.rosterId);
    dbRef.set({
      id: this.rosterId,
      champions: this.roster[0].champions
    }, { merge: true }).then(success => {
      const queryParams = { rosterId: this.rosterId };
      this.router.navigate(
        ['/roster-share'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      });
    }).catch(err => {
      console.log('Failed to add hero - ' + err);
    })
  }
}
