import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  newsId: any;
  newsRef: any;
  news: any;
  new: any;


  constructor(
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,

  ) { }


  ngOnInit() {
    this.loadNews();
  }

  loadNews() {

    this.route.params
      .subscribe(params => {
        this.newsId = params['newsId'];
      });

    this.newsRef = this.db
      .collection('news')
      .doc('new')
      .collection('new', ref => ref.where('slug', '==', this.newsId));

    this.new = this.newsRef.snapshotChanges().pipe(
      map((actions: any) => actions.map(a => {

        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { ...data };
      }))
    );
  }

}