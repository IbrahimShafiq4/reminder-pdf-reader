import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewScheduleComponent } from '../add-new-schedule/add-new-schedule.component';
import { ScheduleService, Schedule } from '../schedule/schedule.service';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [CommonModule, AddNewScheduleComponent],
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  schedules: (Schedule & { id: string })[] = [];
  showDialog = false;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.loadSchedules();
  }

  loadSchedules() {
    this.scheduleService.getAll().subscribe((data) => (this.schedules = data));
  }

  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  onScheduleAdded(newSchedule: Schedule) {
    this.loadSchedules();
  }

  deleteSchedule(id: string) {
    this.scheduleService.delete(id).subscribe(() => {
      this.schedules = this.schedules.filter((s) => s.id !== id);
    });
  }
}
