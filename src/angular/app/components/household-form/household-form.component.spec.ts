import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdFormComponent } from './household-form.component';

describe('HouseholdFormComponent', () => {
  let component: HouseholdFormComponent;
  let fixture: ComponentFixture<HouseholdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
