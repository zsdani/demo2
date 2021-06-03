import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TobevirtualownerComponent } from './tobevirtualowner.component';

describe('TobevirtualownerComponent', () => {
  let component: TobevirtualownerComponent;
  let fixture: ComponentFixture<TobevirtualownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TobevirtualownerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TobevirtualownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
