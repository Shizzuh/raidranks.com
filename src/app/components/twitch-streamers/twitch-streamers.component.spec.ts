import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchStreamersComponent } from './twitch-streamers.component';

describe('TwitchStreamersComponent', () => {
  let component: TwitchStreamersComponent;
  let fixture: ComponentFixture<TwitchStreamersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchStreamersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchStreamersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
