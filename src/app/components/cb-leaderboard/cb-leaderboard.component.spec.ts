import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbLeaderboardComponent } from './cb-leaderboard.component';

describe('CbLeaderboardComponent', () => {
  let component: CbLeaderboardComponent;
  let fixture: ComponentFixture<CbLeaderboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbLeaderboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
