import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TierlistComponent } from './tierlist.component';

describe('TierlistComponent', () => {
  let component: TierlistComponent;
  let fixture: ComponentFixture<TierlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TierlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TierlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
