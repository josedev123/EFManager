import { Component, OnInit, OnDestroy } from '@angular/core';
import { Facility } from 'src/app/models/Facility';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, Router } from '@angular/router';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-edit-facility',
  templateUrl: './edit-facility.component.html',
  styleUrls: ['./edit-facility.component.css']
})
export class EditFacilityComponent implements OnInit, OnDestroy {

  id: string;
  subscription: Subscription;
  facility: Facility = {
    id: '',
    name: ''
  };


  constructor(private facilitiesService: FacilitiesService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.subscription = this.facilitiesService.getFacility(this.id).subscribe(facility => this.facility = facility);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
