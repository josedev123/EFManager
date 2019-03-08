import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { EditFacilityComponent } from './components/edit-facility/edit-facility.component';
import { AuthGuard } from './guards/auth.guard';
import { EventsComponent } from './components/events/events.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { AddEventComponent } from './components/add-event/add-event.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'facilities', component: FacilitiesComponent, canActivate: [AuthGuard]},
  {path: 'facilities/:id', component: EditFacilityComponent, canActivate: [AuthGuard]},
  {path: 'events', component: EventsComponent, canActivate: [AuthGuard]},
  {path: 'events/add', component: AddEventComponent, canActivate: [AuthGuard]},
  {path: 'events/:id', component: EditEventComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
