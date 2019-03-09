import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/Event';
import { EventsService } from 'src/app/services/events.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Facility } from 'src/app/models/Facility';
import { FacilitiesService } from 'src/app/services/facilities.service';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  id: string;
  dt: any;
  event: Event = {
    id: '',
    name: '',
    location: '',
    details: '',
    date: null,
    time: '',
    cost: '',
    group: [
      { name: 'Adults', selected: false, id: 1 },
      { name: 'Children', selected: false, id: 2 },
      { name: 'Whole Family', selected: false, id: 3 }
    ]
  }

  date = new Date();
  planModel: any = {start_time: new Date() };
facilities$: Observable<Facility[]>;

  constructor(    
    private flashMessage: FlashMessagesService,
    private eventService: EventsService,
    private facilitiesService: FacilitiesService,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.facilities$ = this.facilitiesService.getFacilities();
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.eventService.getEvent(this.id).subscribe(event => { 
      this.event = event; 
      this.dt = this.event.date;
      this.date = new Date(this.dt.seconds*1000);
    });
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (!valid) {
      // show error
      this.flashMessage.show('Please fill out the from correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });

    } else {

      this.event.name = value.name;
      this.event.location = value.location;
      this.event.date = value.date;
      this.event.time = value.time;
      this.event.details = value.details;
      this.event.group[0].selected = value.g0;
      this.event.group[1].selected = value.g1;
      this.event.group[2].selected = value.g2;

      // Add new Event
      this.eventService.updateEvent(this.event);
      // show message
      this.flashMessage.show('Event Updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      // redirect to dashboard
      // this.router.navigate(['/']);
    }
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.eventService.deleteEvent(this.id);
      this.flashMessage.show('Event deleted', {
        cssClass: 'alert-success', timeout: 4000
      });
     this.router.navigate(['events/']);
      console.log(this.event)
    }
  }

}
