import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamShareComponent } from './team-share.component';

describe('TeamShareComponent', () => {
  let component: TeamShareComponent;
  let fixture: ComponentFixture<TeamShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
