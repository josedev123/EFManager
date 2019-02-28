import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { EditFacilityComponent } from './components/edit-facility/edit-facility.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'facilities', component: FacilitiesComponent, canActivate: [AuthGuard]},
  {path: 'facilities/:id', component: EditFacilityComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
