import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from '../models/Event';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  eventsCollection: AngularFirestoreCollection<Event>;
  eventDoc: AngularFirestoreDocument<Event>;
  events: Observable<Event[]>;
  event: Observable<Event>;
  constructor(private afs: AngularFirestore) {
    this.eventsCollection = this.afs.collection('events');
  }

  getEvents(): Observable<Event[]> {
    this.events = this.eventsCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Event;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.events;
  }

  getEvent(id: string): Observable<Event> {
    this.eventDoc = this.afs.doc<Event>(`events/${id}`);
    this.event = this.eventDoc.snapshotChanges()
    .pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Event;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.event;
  }

  newEvent(event: Event) {
    this.eventsCollection.add(event);
  }

  updateEvent(event: Event) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.update(event);
  }

  deleteClient(event: Event) {
    this.eventDoc = this.afs.doc(`clients/${event.id}`);
    this.eventDoc.delete();
  }


}
