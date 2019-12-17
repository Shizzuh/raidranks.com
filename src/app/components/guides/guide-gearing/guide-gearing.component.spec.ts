import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideGearingComponent } from './guide-gearing.component';

describe('GuideGearingComponent', () => {
  let component: GuideGearingComponent;
  let fixture: ComponentFixture<GuideGearingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideGearingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideGearingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
