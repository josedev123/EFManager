import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventsService } from 'src/app/services/events.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Facility } from 'src/app/models/Facility';
import { FacilitiesService } from 'src/app/services/facilities.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  event: Event = {
    id: '',
    name: '',
    location: '',
    details: '',
    date: null,
    time: '',
    cost: '',
    group: [],
};

facilities$: Observable<Facility[]>;
value;

  constructor(    private flashMessage: FlashMessagesService,
    private eventService: EventsService,
    private facilitiesService: FacilitiesService,
    private router: Router) {
      this.facilities$ = this.facilitiesService.getFacilities();
     }

    ngOnInit() {
    }

    onSubmit({value, valid}: {value: Event, valid: boolean}) {
      if (!valid) {
        // show error
        this.flashMessage.show('Please fill out the from correctly', {
          cssClass: 'alert-danger', timeout: 4000
        });

      } else {
        // Add new Event
        this.eventService.newEvent(value);
        // show message
        this.flashMessage.show('New event added', {
          cssClass: 'alert-success', timeout: 4000
        });
        // redirect to dashboard
        this.router.navigate(['/']);
      }
    }

}
