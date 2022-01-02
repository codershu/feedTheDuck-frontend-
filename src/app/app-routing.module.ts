import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionComponent } from './views/description/description.component';
import { RecordComponent } from './views/record/record.component';
import { SummaryComponent } from './views/summary/summary.component';

const routes: Routes = [
  { path: 'home', component: DescriptionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'record', component: RecordComponent },
  { path: 'summary', component: SummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
