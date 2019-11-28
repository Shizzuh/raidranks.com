import { Component, OnInit, Input } from '@angular/core';
import { Score } from 'src/app/models/score.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input() score: Score;
  @Input() rank: number;
  screenshot: Observable<string | null>;
  moreDetails: boolean;
  damage: string;

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
    const ref = this.storage.ref('cb-leaderboards/'+this.score.id);
    this.screenshot = ref.getDownloadURL();
    this.damage = this.score.damage + '';
    this.damage.match(/[Mm]/g) ? this.damage : this.damage+'m';
  }

  showDetails() {
    this.moreDetails ? this.moreDetails = false : this.moreDetails = true;
  }

}
