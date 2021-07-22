import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FlightDataComponent } from './flight-data/flight-data.component';
import { HomeComponent } from './home/home.component';
import { MissionComponent } from './mission/mission.component';
import { ParameterComponent } from './parameter/parameter.component';
import { AuthGuard } from './auth.guard';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
  },
  {
    path:'Dashboard',
    component: FlightDataComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'mission',
    component: MissionComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'parameter',
    component: ParameterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'landing',
    component : LandingComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
