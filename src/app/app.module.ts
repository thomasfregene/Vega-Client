import { BrowserModule } from '@angular/platform-browser';
import { NgModule, MissingTranslationStrategy, ErrorHandler } from '@angular/core';
import{ToastrModule, ToastrComponentlessModule} from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import {  VehicleService } from './services/vehicle.service';
import { HttpClientModule, HttpClient, XhrFactory } from '@angular/common/http';
import { FormStyle } from '@angular/common';
import{FormsModule} from '@angular/forms'
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationsComponent } from './shared/paginations.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
//import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavmenuComponent,
    VehicleFormComponent,
    VehicleListComponent,
    PaginationsComponent,
    ViewVehicleComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule,
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler},
    //{provide: XhrFactory, useClass: BrowserXhrWithProgress},
    AuthService,
    AuthGuardService ,
    AdminAuthGuardService ,
    VehicleService,
    HttpClient,
    HttpClientModule,
    PhotoService,
   // ProgressService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
