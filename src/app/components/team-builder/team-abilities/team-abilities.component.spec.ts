import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAbilitiesComponent } from './team-abilities.component';

describe('TeamAbilitiesComponent', () => {
  let component: TeamAbilitiesComponent;
  let fixture: ComponentFixture<TeamAbilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAbilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAbilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
