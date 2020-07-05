import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { XhrFactory } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private uploadProgress: Subject<any>;

  startTracking(){
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  }

  notify(progress){
    if(this.uploadProgress)
    this.uploadProgress.next(progress);
  } 

  endTracking(){
    if(this.uploadProgress)
    this.uploadProgress.complete();
  }
    constructor() { }
}


/*@Injectable()
export class BrowserXhrWithProgress extends XhrFactory {
  constructor(private service: ProgressService) {
    super();
  }
  
  build(): XMLHttpRequest{
    var xhr: XMLHttpRequest = this.build();

    
    xhr.upload.onprogress = (event)=>{
      this.service.notify(this.createProgress(event));
    };
    xhr.upload.onloadend = () =>{
      this.service.endTracking();
    }

    return xhr; 
  }

  private createProgress(event){
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    }
  };
}*/

