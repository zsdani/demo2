import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupadoptComponent } from './popupadopt.component';

describe('PopupadoptComponent', () => {
  let component: PopupadoptComponent;
  let fixture: ComponentFixture<PopupadoptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupadoptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupadoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
