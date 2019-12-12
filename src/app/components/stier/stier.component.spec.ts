import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StierComponent } from './stier.component';

describe('StierComponent', () => {
  let component: StierComponent;
  let fixture: ComponentFixture<StierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
