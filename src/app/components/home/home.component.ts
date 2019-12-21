import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    this.news = this.db.collection('news');
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
