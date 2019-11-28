import { Component, OnInit, HostListener } from '@angular/core';
import { Score } from 'src/app/models/score.model';
import * as _ from 'lodash';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cb-leaderboard',
  templateUrl: './cb-leaderboard.component.html',
  styleUrls: ['./cb-leaderboard.component.scss']
})
export class CbLeaderboardComponent implements OnInit {

  scores$: any;
  scoreSubmission: boolean;
  orderedScores: any;
  scores: any;
  filteredScores: any;
  filtered: boolean;
  showFilter: any;
  comp: string;
  difficulty: string;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

    this.scores$ = this.db.collection('leaderboard-pending');
    this.scores$ = this.scores$.snapshotChanges()
      .pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          return {...data };
        }))
      );

    this.scores$
      .pipe(
        map(score => _.orderBy(score, ['damage'], ['desc']) )
      )
      .subscribe(scores => {
        this.scores = _.filter(scores, 'approved');
        this.filteredScores = this.scores;
      })
  }

  toggleScoreSubmission() {
    this.scoreSubmission ? this.scoreSubmission = false : this.scoreSubmission = true;
  }

  filterComp(comp: string) {
    this.comp = comp;
    this.filter();
  }

  filterDifficulty(difficulty: string) {
    this.difficulty = difficulty;
    this.filter();
  }

  filter() {
    if (this.difficulty && this.comp) {
      this.filteredScores = _.filter(this.scores, (score: Score) => {
        return score.category === this.comp && score.difficulty === this.difficulty;
      })
    } else if (this.difficulty) {
      this.filteredScores = _.filter(this.scores, (score: Score) => {
        return score.difficulty === this.difficulty;
      })
    } else {
      this.filteredScores = _.filter(this.scores, (score: Score) => {
        return score.category === this.comp;
      })
    }
  }

  resetFilter() {
    this.difficulty = null;
    this.comp = null;
    this.filteredScores = this.scores;
  }

  toggleFilter() {
    this.showFilter ? this.showFilter = false : this.showFilter = true;
  }

  @HostListener('document:click') clickout() {
    this.showFilter = false
  }

}
