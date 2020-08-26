import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenSlickComponent } from './full-screen-slick.component';

describe('FullScreenSlickComponent', () => {
  let component: FullScreenSlickComponent;
  let fixture: ComponentFixture<FullScreenSlickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenSlickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenSlickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
