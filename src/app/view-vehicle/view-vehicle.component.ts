import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { PhotoService } from '../services/photo.service';
import { ProgressService } from '../services/progress.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;

  constructor(
    private authsService: AuthService,
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService,
    private vehicleService: VehicleService,
    private progressService: ProgressService
  ) { 

    route.params.subscribe(p=>{
      this.vehicleId = +p['id'];
      if(isNaN(this.vehicleId) || this.vehicleId <= 0){
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit(): void {
    this.photoService.getPhotos(this.vehicleId)
    .subscribe((photos: any[])=> this.photos = photos);


    this.vehicleService.getVehicle(this.vehicleId)
    .subscribe(
      v => this.vehicle = v,
      err=>{
        if(err.status == 404){
          this.router.navigate(['/vehicles']);
          return;
        }
      }
    );
  }

  delete(){
    if(confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id)
      .subscribe(x=>{
        this.router.navigate(['/vehicles']);
      });
    }
  }

  uploadPhoto(){
    
    /*this.progressService.createUploadProgress()
    .subscribe(progress=>{
      console.log(progress);
      this.zone.run(()=>{
        this.progress = progress;
      });
    },
    null,
    ()=>{this.progress = null});*/
    
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';
    
    this.photoService.upload(this.vehicleId,file)
    .subscribe(photo=>{
      this.photos.push(photo)
    },
    err=>{
      alert("invalid file")
    });
  }

}
