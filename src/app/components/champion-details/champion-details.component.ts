import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { TeamBuilderService } from './../../services/team-builder.service';

@Component({
  selector: 'champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.scss']
})
export class ChampionDetailsComponent implements OnInit, OnDestroy {

  pageUrl: string;
  pageId: string;
  championCollection: any;
  champion: any;
  champFaction: string;
  champName: any;
  guideUrl: any;
  activatedRoute: ActivatedRoute;
  champFullName: any;
  champFac: any;
  champSkills: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    public sanitizer: DomSanitizer,
    private teamBuilderService: TeamBuilderService
  ) { }

  ngOnDestroy(): void {
    this.teamBuilderService.unsetChampion();
  }

  ngOnInit() {
    // const team = {
    //   id: 133437,
    //   name: 'MinoSpider 20 - TEST',
    //   champions: []
    // };

    // const team = {
    //   id: 1337,
    //   name: 'Spider 20 - TEST',
    //   champions: [{
    //     id: 884,
    //     name: 'Martyr',
    //     faction: 'Dark Elves'
    //   },{
    //     id: 32989,
    //     name: 'Coldheart',
    //     faction: 'Dark Elves'
    //   }]
    // };

    // const champ = {
    //   id: 32989,
    //   name: 'Coldheart',
    //   faction: 'Dark Elves'
    // }

    // this.teamBuilderService.addTeam(team);
    // this.teamBuilderService.deleteTeam(team);
    // this.teamBuilderService.deleteChampFromTeam(champ);
    // this.teamBuilderService.addChampToTeam(team, champ);

    this.loadChamps();
    this.pageUrl = 'https://raidranks.com' + this.router.url;

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.loadChamps();
      }
    });

  }

  loadChamps() {
    this.route.params.subscribe(params => {
      this.champFaction = params['faction'].replace('-', ' ').replace('-', ' ');
      this.champName = params['champion'];
      this.pageId = this.champName;
    });

    this.championCollection = this.db.collection('championsV3').doc(this.champFaction).collection('champions', ref => ref.where('champion.slug', '==', this.champName));
    this.champion = this.championCollection.snapshotChanges().pipe(
      map((actions: any) => actions.map(a => {

        const data = a.payload.doc.data().champion;
        const id = a.payload.doc.id;

        const champ = {
          id: Math.floor((Math.random() * 9999999999) + 999999999),
          name: data.name,
          faction: data.faction.name,
          portrait: data.thumbnail,
          rarity: data.rarity,
          element: data.element
        }

        this.teamBuilderService.setChampion(champ);

        this.champFac = data.faction.name;
        this.champFullName = data.name;
        this.champSkills = data.skills;
        this.guideUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.guide_video_id);

        return { id, ...data };
      }))
    );
  }
}
