import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfComponenetComponent } from './pdf-componenet/pdf-componenet.component';

const routes: Routes = [
  { path: '', redirectTo: 'pdf', pathMatch: 'full' },
  { path: 'pdf', component: PdfComponenetComponent, title: 'Pdf Reader' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfReaderRoutingModule { }
