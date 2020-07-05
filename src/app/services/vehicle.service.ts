import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { SaveVehicle } from '../models/vehicle';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

//make api
  getMakes(){
    return this.http.get('https://localhost:44348/api/makes').pipe();
  }

  //feature api
  getFeatures(){
    return this.http.get('https://localhost:44348/api/features').pipe();
  }

  create(vehicle){
    return this.http.post('https://localhost:44348/api/vehicles', vehicle).pipe();

  }

  getVehicle(id){
    return this.http.get('https://localhost:44348/api/vehicles/' + id).pipe();
  }

  getVehicles(filter){
    return this.http.get('https://localhost:44348/api/vehicles' + '?' + this.toQueryString(filter)).pipe();
  }

  toQueryString(obj){
    var parts = [];
    for(var property in obj){
      var value = obj[property];
      if(value != null && value != undefined)
      parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));

    }
    return parts.join('&');

  }

  update(vehicle: SaveVehicle){
    return this.http.put('https://localhost:44348/api/vehicles/' + vehicle.id, vehicle).pipe();
  }

  delete(id){
    return this.http.delete('https://localhost:44348/api/vehicles/' + id);
  }
}
