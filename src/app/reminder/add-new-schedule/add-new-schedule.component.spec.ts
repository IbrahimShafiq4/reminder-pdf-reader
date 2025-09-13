import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewScheduleComponent } from './add-new-schedule.component';

describe('AddNewScheduleComponent', () => {
  let component: AddNewScheduleComponent;
  let fixture: ComponentFixture<AddNewScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
