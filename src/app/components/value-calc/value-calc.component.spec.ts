import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCalcComponent } from './value-calc.component';

describe('ValueCalcComponent', () => {
  let component: ValueCalcComponent;
  let fixture: ComponentFixture<ValueCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
