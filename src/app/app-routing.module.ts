import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAlertComponent } from './views/list-alert/list-alert.component';
import { CreateAlertComponent } from './views/create-alert/create-alert.component';
import { LoginComponent } from './views/login/login.component';
import { FtpComponent } from './views/ftp/ftp.component';
import { HomeComponent } from './views/home/home.component';

import { SettingsComponent } from './views/settings/settings.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, children: [
     
      { path: 'ftp', component: FtpComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'create-alert', component: CreateAlertComponent },
      { path: 'list-alert', component: ListAlertComponent }
    ]
  }

  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
