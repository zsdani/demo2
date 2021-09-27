import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterpageComponent } from './shelterpage.component';

describe('ShelterpageComponent', () => {
  let component: ShelterpageComponent;
  let fixture: ComponentFixture<ShelterpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelterpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
