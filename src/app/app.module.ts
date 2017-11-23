import { RefPreviewService } from './services/ref-preview.service';

import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RefDesignService } from './services/ref-design.service';


import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes = [{ path: '', component: HomeComponent }

];


@NgModule({
  declarations: [
    AppComponent, HomeComponent,
  ],
  imports: [


    BrowserModule,
    HttpClientModule,
    //Add .withServerTransition() to support Universal rendering.
    //The application ID can be any identifier which is unique on the page.
    BrowserModule.withServerTransition({ appId: 'my-app-id' }),
    RouterModule.forRoot(appRoutes)

  ],
  providers: [RefDesignService, RefPreviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
