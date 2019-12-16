import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideFarmingComponent } from './guide-farming.component';

describe('GuideFarmingComponent', () => {
  let component: GuideFarmingComponent;
  let fixture: ComponentFixture<GuideFarmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideFarmingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideFarmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
