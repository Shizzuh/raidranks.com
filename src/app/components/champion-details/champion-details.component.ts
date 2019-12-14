import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { ClipboardService } from 'ngx-clipboard'
import { TeamBuilderService } from './../../services/team-builder.service';
import { faCheck } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'champion-details',
  templateUrl: './champion-details.component.html',
  styleUrls: ['./champion-details.component.scss']
})
export class ChampionDetailsComponent implements OnInit, OnDestroy {

  helpOverlayIsActive: boolean;


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
  copied: boolean;
  faCheck = faCheck;
  shadowbotName: string;

  constructor(
    private clipboardService: ClipboardService,
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

    this.loadChamps();
    this.pageUrl = 'https://raidranks.com' + this.router.url;

    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.loadChamps();
      }
    });

  }

  loadChamps() {
    this.route.params
      .subscribe(params => {
        this.champFaction = params['faction'].replace('-', ' ').replace('-', ' ');
        this.champName = params['champion'];
        this.pageId = this.champName;
      });

    this.championCollection = this.db
      .collection('championsV3')
      .doc(this.champFaction)
      .collection('champions', ref => ref.where('champion.slug', '==', this.champName));
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

        this.shadowbotName = '$'+data.name.toLowerCase().replace('-', '').replace('-', '').replace('\'', '')+' info';

        this.champFac = data.faction.name;
        this.champFullName = data.name;
        this.champSkills = data.skills;
        this.guideUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.guide_video_id);

        return { id, ...data };
      }))
    );
  }

  copyShadowbotCommand(shadowbotName: string) {
    this.clipboardService.copyFromContent(shadowbotName);
    this.copied = true;
  };



helpOverlay() {
  this.helpOverlayIsActive ? this.helpOverlayIsActive = false : this.helpOverlayIsActive = true;
}
}