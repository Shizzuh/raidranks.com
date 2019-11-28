import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterShareComponent } from './roster-share.component';

describe('RosterShareComponent', () => {
  let component: RosterShareComponent;
  let fixture: ComponentFixture<RosterShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
