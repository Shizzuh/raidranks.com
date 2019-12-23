import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'contentcreators',
  templateUrl: './contentcreators.component.html',
  styleUrls: ['./contentcreators.component.scss']
})
export class ContentcreatorsComponent implements OnInit {
  creators: any;
  helpOverlayIsActive: boolean;
 

  constructor(
    private db: AngularFirestore
    
  ) {
    this.helpOverlayIsActive = false;
   }

  ngOnInit() {
    this.creators = this.db.collection('creators');
    this.creators = this.creators.snapshotChanges()
      .pipe(
        map((actions: any) => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
  helpOverlay() {
    this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
  }
}