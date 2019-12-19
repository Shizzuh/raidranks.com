import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchDetailsComponent } from './twitch-details.component';

describe('TwitchDetailsComponent', () => {
  let component: TwitchDetailsComponent;
  let fixture: ComponentFixture<TwitchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
