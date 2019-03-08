import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Observable } from 'rxjs';
import { Event } from '../../models/Event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Observable<Event[]>;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.events = this.eventsService.getEvents();
  }

}
