import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { ToastrModule, Toast } from 'ngx-toastr';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo:'vehicles', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
{path: 'vehicles/new', component: VehicleFormComponent, /*canActivate: [AuthGuardService]*/},
  {path: 'vehicles/edit/:id', component: VehicleFormComponent, /*canActivate: [AuthGuardService]*/},
  {path: 'vehicles/:id', component: ViewVehicleComponent},
  {path: 'vehicles', component: VehicleListComponent}
  // {path: 'vehicles/:id', component: VehicleFormComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
