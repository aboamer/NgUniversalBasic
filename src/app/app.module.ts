import { CallRestService } from './services/call-rest.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './views/core/header/header.component';
import { FooterComponent } from './views/core/footer/footer.component';
import { SidebarComponent } from './views/core/sidebar/sidebar.component';
import { LoginComponent } from './views/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FtpComponent } from './views/ftp/ftp.component';
import { CreateAlertComponent } from './views/create-alert/create-alert.component';
import { ListAlertComponent } from './views/list-alert/list-alert.component';
import { SettingsComponent } from './views/settings/settings.component';
import { HttpModule, Http } from '@angular/http';
import { HeaderTitleService } from './services/header-title.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './services/notification.service';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent, 
    SidebarComponent, 
    LoginComponent, 
    FtpComponent, 
    CreateAlertComponent, 
    ListAlertComponent, 
    SettingsComponent,
  ],
  imports: [
    HttpModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    //Add .withServerTransition() to support Universal rendering.
    //The application ID can be any identifier which is unique on the page.
    BrowserModule.withServerTransition({ appId: 'my-app-id' }),

  ],
  providers: [CallRestService, HeaderTitleService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
