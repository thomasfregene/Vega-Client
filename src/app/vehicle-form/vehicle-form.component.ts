import * as _ from 'underscore';
import { Component, OnInit, Injector } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { SaveVehicle, Vehicle } from '../models/vehicle';

// @Injector({});
@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    },
  };
  //isRegistered: false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'] || 0;
    });
  }

  ngOnInit(): void {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    forkJoin(sources).subscribe(
      (data) => {
        this.setMakes(data[0]);
        this.setFeatures(data[1]);

        if (this.vehicle.id) {
          //this.setVehicle(data[2]);
          this.populateModels();
        }
      },
      (err) => {
        if (err.status == 404) this.router.navigate(['/home']);
      }
    );
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  private setMakes(m) {
    return (this.makes = m);
  }

  private setFeatures(f) {
    return (this.features = f);
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  private populateModels() {
    var selectedMake = this.makes.find((m) => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    var result$ = this.vehicle.id
      ? this.vehicleService.update(this.vehicle)
      : this.vehicleService.create(this.vehicle);
    result$.subscribe(vehicle => {
      alert('Success');
    });
    this.router.navigate(['/vehicles/', this.vehicle.id]);

    /*if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle).subscribe((x) => {
        alert('success');
      });
    } else {
      this.vehicleService.create(this.vehicle).subscribe(
        (x) => console.log(x),
        (err) => {
          alert('An Unexpected error occured');
        }
      );
    }*/
  }
  /*delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id).subscribe((x) => {
        this.router.navigate(['/home']);
      });
    }
  }*/
}
