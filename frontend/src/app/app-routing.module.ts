import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LandmarkComponent} from "./components/landmark/landmark.component";
import {LoginComponent} from "./components/login/login.component";


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'landmarks/:id', component: LandmarkComponent },
  { path: 'landmarks', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
