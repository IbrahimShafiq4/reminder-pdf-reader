import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Schedule, ScheduleService } from '../schedule/schedule.service';

@Component({
  selector: 'app-add-new-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ScheduleService],
  templateUrl: './add-new-schedule.component.html',
  styleUrls: ['./add-new-schedule.component.scss'],
})
export class AddNewScheduleComponent {
  @Output() closeDialog = new EventEmitter<void>();
  @Output() scheduleAdded = new EventEmitter<Schedule>();

  scheduleForm = new FormGroup({
    scheduleDate: new FormControl('', Validators.required),
    personName: new FormControl('', Validators.required),
    notes: new FormControl(''),
    personRank: new FormControl('', Validators.required),
    schedulePlace: new FormControl('', Validators.required),
  });

  constructor(private scheduleService: ScheduleService) {}

  onSubmit() {
    if (this.scheduleForm.invalid) return;

    this.scheduleService.add(this.scheduleForm.value as Schedule).subscribe({
      next: (res) => {
        this.scheduleAdded.emit(res);
        this.closeDialog.emit();
        this.scheduleForm.reset();
        console.log(res)
      },
    });
  }

  onCancel() {
    this.closeDialog.emit();
  }
}
