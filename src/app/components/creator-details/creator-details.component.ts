
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'creator-details',
  templateUrl: './creator-details.component.html',
  styleUrls: ['./creator-details.component.scss']
})
export class CreatorDetailsComponent implements OnInit {
  creatorId: any;
  creatorRef: any;
  creator: any;
  YoutubePlaylist: any;


  constructor(
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    this.loadCreator();
  }

  loadCreator() {

    this.route.params
      .subscribe(params => {
        this.creatorId = params['creatorId'];
      });

    this.creatorRef = this.db
      .collection('creators')
      .doc('creators')
      .collection('creators', ref => ref.where('slug', '==', this.creatorId));

    this.creator = this.creatorRef.snapshotChanges().pipe(
      map((actions: any) => actions.map(a => {

        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.YoutubePlaylist = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.YoutubePlaylist);

        return { ...data };
      }))
    );
  }

}
