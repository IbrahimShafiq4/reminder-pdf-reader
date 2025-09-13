import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReminderComponent } from './reminder/reminder.component';

const routes: Routes = [
  { path: '', redirectTo: 'reminder', pathMatch: 'full' },
  {
    path: 'reminder',
    component: ReminderComponent,
    title: 'Schedule Reminder',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReminderRoutingModule {}
