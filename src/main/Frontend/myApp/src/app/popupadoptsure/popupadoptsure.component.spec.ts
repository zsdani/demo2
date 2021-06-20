import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupadoptsureComponent } from './popupadoptsure.component';

describe('PopupadoptsureComponent', () => {
  let component: PopupadoptsureComponent;
  let fixture: ComponentFixture<PopupadoptsureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupadoptsureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupadoptsureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
