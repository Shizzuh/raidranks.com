import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AscensionCalcComponent } from './ascension-calc.component';

describe('AscensionCalcComponent', () => {
  let component: AscensionCalcComponent;
  let fixture: ComponentFixture<AscensionCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AscensionCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AscensionCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
