import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from 'src/app/models/team.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
  selector: 'team-abilities',
  templateUrl: './team-abilities.component.html',
  styleUrls: ['./team-abilities.component.scss']
})
export class TeamAbilitiesComponent implements OnInit {

  @Input() team: Team;
  @Output() closeAbilities = new EventEmitter<boolean>();
  champFaction: string;
  champName: string;
  championCollection: any;
  champion: any;
  champ: any[];

  constructor(
    private db: AngularFirestore,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    this.champ = [];
    this.team.champions.map(champ => {
      this.loadChamp(champ.name, champ.faction);
    })
  }

  loadChamp(name, faction) {
    this.champFaction = faction.replace('-', ' ').replace('-', ' ').toLowerCase();
    this.champName = name.replace(' ', '-').replace(' ', '-').replace('\'', '-').toLowerCase();

    this.championCollection = this.db
      .collection('championsV3')
      .doc(this.champFaction)
      .collection('champions', ref => ref.where('champion.slug', '==', this.champName));

    this.champion = this.championCollection.snapshotChanges().pipe(
      map((actions: any) => actions.map(a => {
        const data = a.payload.doc.data().champion;
        this.champ.push(data);
        return { ...data };
      }))
    ).subscribe();
  }

  close() {
    this.closeAbilities.next(true);
  }

}
