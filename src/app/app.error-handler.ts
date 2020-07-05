import { ErrorHandler } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export class AppErrorHandler implements ErrorHandler{
    //constructor(private toastrService: ToastrService);
    handleError(error: any): void {
        //console.log("ERROR");

        //toasty error notification
    }

}