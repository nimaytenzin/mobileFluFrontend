import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { RouteGuard } from './service/route.guard';
import { PublicInterfaceComponent } from "./public-interface/public-interface.component";
import { DriverInterfaceComponent } from './driver-interface/driver-interface.component';


const routes: Routes = [
  {path: '', component: PublicInterfaceComponent},
  {path: 'driver', component:DriverInterfaceComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
