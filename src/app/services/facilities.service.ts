import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Facility } from '../models/Facility';


@Injectable({
  providedIn: 'root'
})
export class FacilitiesService {
  facilitiesCollection: AngularFirestoreCollection<Facility>;
  facilityDoc: AngularFirestoreDocument<Facility>;
  facilities: Observable<Facility[]>;
  facility: Observable<Facility>;

  constructor(private afs: AngularFirestore) {
    this.facilitiesCollection = this.afs.collection('facilities');
  }

  getFacilities(): Observable<Facility[]> {
    this.facilities = this.facilitiesCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Facility;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.facilities;
  }

  getFacility(id: string): Observable<Facility> {
    this.facilityDoc = this.afs.doc<Facility>(`facilities/${id}`);
    this.facility = this.facilityDoc.snapshotChanges()
    .pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Facility;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.facility;
  }


  updateClient(facility: Facility) {
    this.facilityDoc = this.afs.doc(`clients/${facility.id}`);
    this.facilityDoc.update(facility);
  }


}
