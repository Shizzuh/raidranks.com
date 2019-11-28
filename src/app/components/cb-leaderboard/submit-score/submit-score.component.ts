import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { faPlus, faCheck, faTimes } from '@fortawesome/pro-light-svg-icons';
import { Champion } from 'src/app/models/team.model';
import { ChampionsService } from 'src/app/services/champions.service';
import { Storage } from './../../../services/store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';
import { NgxPicaService } from 'ngx-pica';
import * as _ from 'lodash';

@Component({
  selector: 'submit-score',
  templateUrl: './submit-score.component.html',
  styleUrls: ['./submit-score.component.scss']
})
export class SubmitScoreComponent implements OnInit {

  @Output() toggleScoreSubmission = new EventEmitter<boolean>();
  @ViewChild('search', { static: false }) searchField: ElementRef;
  searchInput: string;
  searchResults: Champion[];
  faPlus = faPlus;
  faCheck = faCheck;
  faTimes = faTimes;
  fileData: File = null;
  previewUrl: any = null;
  cbTeam: Champion[];
  userName: string;
  category: string;
  difficulty: string;
  damage: number;
  imageUrl: string;
  scoreSubmitted: boolean;

  images: File[] = [];
  championFlatList: any;
  championList: Champion[];
  submissionId: number;
  screenshot: File;
  imageOptions: NgxPicaResizeOptionsInterface;
  clan: any;
  formIncomplete: any;

  constructor(
    private ngxPicaService: NgxPicaService,
    private championsService: ChampionsService,
    private storage: AngularFireStorage,
    private localStorage: Storage,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.submissionId = new Date().getTime();
    this.localStorage.set('cbLeaderboardTeam', []);
    this.championsService.getAllChampions();
    if (localStorage.getItem('championFlatList')) {
      this.championList = _.orderBy(
        this.localStorage.get('championFlatList'), ['faction', 'rarity', 'name'], ['asc', 'asc', 'asc']
      );
    } else {
      this.championFlatList = this.db.collection('championsV2');
      this.championFlatList = this.championFlatList.snapshotChanges()
        .pipe(
          map((actions: any) => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );

      this.championFlatList.subscribe(resp => {
        resp.map(champions => {
          champions.champions.map(champ => {
            champ.name = champ.name.toLowerCase();
          })
          this.localStorage.set('championFlatList', champions.champions);
        })
      })
    }
    this.championList = null;
    this.formIncomplete =
       !this.previewUrl
    || !this.clan
    || !this.userName
    || !this.category
    || !this.difficulty
    || !this.damage
    || !this.cbTeam
    || !this.previewUrl
    || !this.championList;
  }

  closeScoreSubmission() {
    this.toggleScoreSubmission.next(false);
  }

  updateSearch($event: Event) {
    const stringEmitted = ($event.target as HTMLInputElement).value.toLowerCase();
    this.championList = _.filter(this.localStorage.get('championFlatList'), (item: any) => {
      return item.name.indexOf(stringEmitted) > -1;
    });
  }

  emptyCheck() {
    const stringEmitted = this.searchInput;
    if (stringEmitted.length === 0) {
      this.championList = null
    } else {
      return;
    }
  }

  addChampToTeam(champ: Champion) {

    const team = this.localStorage.get('cbLeaderboardTeam');
    if (team.length < 5) {
      champ.id = new Date().getTime();
      team.push(champ);
      this.cbTeam = team;
      this.localStorage.set('cbLeaderboardTeam', team);
      this.focusSearch();
      this.validateForm();
    } else {
      return;
    }
  }

  removeChamp(champ: Champion) {
    const team = this.localStorage.get('cbLeaderboardTeam');
    const teamS = JSON.stringify(team);
    const champS = JSON.stringify(champ);

    let updatedTeam = teamS.replace(champS, '');
    updatedTeam = updatedTeam
      .replace('[,{', '[{')
      .replace('},]', '}]')
      .replace(',,', ',')
      .replace('[,', '[')
      .replace(',]', ']');

    updatedTeam = JSON.parse(updatedTeam);
    this.localStorage.set('cbLeaderboardTeam', updatedTeam);
    this.cbTeam = this.localStorage.get('cbLeaderboardTeam');
  }

  focusSearch() {
    this.searchInput = '';
    this.searchField.nativeElement.focus();
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];

    this.imageOptions = {
      aspectRatio: {
        keepAspectRatio: true
      }
    }
    this.ngxPicaService.resizeImage(this.fileData, 600, 300, this.imageOptions)
      .subscribe((imageResized: File) => {
        let reader: FileReader = new FileReader();
        reader.readAsDataURL(imageResized);
        this.fileData = imageResized;
        this.preview();
      });
  }

  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }

  uploadFile(event, fileName) {
    const file = event;
    const filePath = '/cb-leaderboards/' + fileName;
    this.storage.upload(filePath, file);
  }

  submitScore() {
    const score = {
      id: this.submissionId,
      userName: this.userName,
      clan: this.clan,
      category: this.category,
      difficulty: this.difficulty,
      damage: this.damage,
      team: this.cbTeam,
      approved: false
    }

    const dbRef = this.db.doc('leaderboard-pending/' + score.id);
    dbRef.set(score, { merge: true }).then(success => {
      this.uploadFile(this.fileData, this.submissionId);

      this.screenshot = null;
      this.clan = null;
      this.submissionId = null;
      this.userName = null;
      this.category = null;
      this.difficulty = null;
      this.damage = null;
      this.cbTeam = null;
      this.previewUrl = null;
      this.championList = null;

    })
    .then(success => {
      this.scoreSubmitted = true;
      setTimeout(() => {
        this.closeScoreSubmission();
      }, 3000);
    })
    .catch(err => {
      console.log('Failed to add hero - ' + err);
    })
  }

  validateForm() {
    this.formIncomplete =
      !this.fileData
      || !this.clan
      || !this.userName
      || !this.category
      || !this.difficulty
      || !this.damage
      || !this.cbTeam
      || !this.championList;
  }

  clanValidation() {
    if (this.clan.length > 4) {
      this.clan = this.clan.substring(0, 4);
    }
  }
}

export interface NgxPicaResizeOptionsInterface {
  aspectRatio?: AspectRatioOptions;
  quality?: number;
  alpha?: boolean;
  unsharpAmount?: number;
  unsharpRadius?: number;
  unsharpThreshold?: number;
}

export interface AspectRatioOptions {
  keepAspectRatio: boolean;
  forceDimensions?: boolean;
}

export enum NgxPicaErrorType {
  NO_FILES_RECEIVED = 'NO_FILES_RECEIVED',
  CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED = 'CANVAS_CONTEXT_IDENTIFIER_NOT_SUPPORTED',
  NOT_BE_ABLE_TO_COMPRESS_ENOUGH = 'NOT_BE_ABLE_TO_COMPRESS_ENOUGH'
}

export interface NgxPicaErrorInterface {
  err: NgxPicaErrorType;
  file?: File;
}
