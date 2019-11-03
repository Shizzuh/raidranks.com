import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardsComponent } from './shards.component';

describe('ShardsComponent', () => {
  let component: ShardsComponent;
  let fixture: ComponentFixture<ShardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
