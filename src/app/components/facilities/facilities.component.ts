import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from 'src/app/services/facilities.service';
import { Facility } from 'src/app/models/Facility';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {
  facilities: Observable<Facility[]>;

  constructor(private facilitiesService: FacilitiesService) { }

  ngOnInit() {
    this.facilities = this.facilitiesService.getFacilities();
  }

}
