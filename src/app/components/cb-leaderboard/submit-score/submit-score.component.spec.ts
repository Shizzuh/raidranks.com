import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitScoreComponent } from './submit-score.component';

describe('SubmitScoreComponent', () => {
  let component: SubmitScoreComponent;
  let fixture: ComponentFixture<SubmitScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
