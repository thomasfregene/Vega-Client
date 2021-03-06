import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId, photo){
    var formData = new FormData();
    formData.append('file', photo, photo.name)
    return this.http.post(`https://localhost:44348/api/vehicles/${vehicleId}/photos`, formData).pipe();
  }

  getPhotos(vehicleId){
    return this.http.get(`https://localhost:44348/api/vehicles/${vehicleId}/photos`).pipe();
  }
}
