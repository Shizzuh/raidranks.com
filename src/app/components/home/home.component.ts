import { Storage } from './../../services/store.service';
import { ChampionsService } from 'src/app/services/champions.service';
import { Component, OnInit } from '@angular/core';
import { Champion } from 'src/app/models/team.model';
import * as _ from 'lodash';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  championsList: Champion[];
  randomChamps: Champion[] = [];
  legendaryChampions: Champion[];
  epicChampions: Champion[];
  rareChampions: Champion[];
  onCoolDown: boolean;
  numberOfSummons: number;
  showBluestacks: boolean;
  bluestacksCount: number;
  adActive: boolean;
  news: any;

  selected = 'option2';

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.news = this.db.collection('newsthumb');
    this.news = this.news.snapshotChanges()
      .pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
}
