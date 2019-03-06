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

  onSubmit({value, valid}: {value: Facility, valid: boolean}) {
    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // add id to client
      value.id = this.id;
      // update client
      this.facilitiesService.updateFacility(value);
      this.flashMessage.show('Facility updated', {
        cssClass: 'alert-success', timeout: 4000
      });
     this.router.navigate(['/facilities/' + this.id]);
    }
  }
}
