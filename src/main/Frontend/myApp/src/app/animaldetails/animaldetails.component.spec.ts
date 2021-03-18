import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimaldetailsComponent } from './animaldetails.component';

describe('AnimaldetailsComponent', () => {
  let component: AnimaldetailsComponent;
  let fixture: ComponentFixture<AnimaldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimaldetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
