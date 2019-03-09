import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Observable, Subscription } from 'rxjs';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  events: any;
  eventsList: any;
  facilities: any;
  subscription: Subscription;
  displayedColumns: string[] = ['date', 'name', 'location', 'edit'];
  
  constructor(private eventsService: EventsService, private facilitiesService: FacilitiesService) {
    this.facilities = this.facilitiesService.getFacilities().subscribe(facilities => this.facilities = facilities);

   }

  ngOnInit() {
    this.subscription = this.eventsService.getEvents().subscribe(events => {
      this.eventsList = events.map(eventItem => {
        return {
            name : eventItem.name,
            locationName: this.facilities.find( location => location.id === eventItem.location ),
            date: eventItem.date,
            id: eventItem.id

        }
      });
    }
      );


  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
