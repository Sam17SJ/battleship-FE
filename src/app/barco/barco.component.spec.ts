import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcoComponent } from './barco.component';

describe('BarcoComponent', () => {
  let component: BarcoComponent;
  let fixture: ComponentFixture<BarcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
