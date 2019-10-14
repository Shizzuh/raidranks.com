import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankCalcComponent } from './rank-calc.component';

describe('RankCalcComponent', () => {
  let component: RankCalcComponent;
  let fixture: ComponentFixture<RankCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
