import { BrowserModule } from '@angular/platform-browser';

import {environment} from '../environments/environment';

import { AngularFireModule } from '@angular/fire';

import {AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { MatIconModule } from '@angular/material/icon';
import { FacilitiesComponent } from './components/facilities/facilities.component';
import { EditFacilityComponent } from './components/edit-facility/edit-facility.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatRippleModule, MatCheckboxModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';

import { EventsComponent } from './components/events/events.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FacilitiesComponent,
    EditFacilityComponent,
    EventsComponent,
    EditEventComponent,
    AddEventComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'clientpanel'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
    MatIconModule,
    MatRippleModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule,
    MatNativeDateModule, MatTableModule,
    NgxMaterialTimepickerModule.forRoot(),
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
