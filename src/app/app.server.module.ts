import { NgModule, enableProdMode } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();

@NgModule({
    imports: [
        // The AppServerModule should import your AppModule followed
        // by the ServerModule from @angular/platform-server.
        BrowserModule.withServerTransition({ appId: 'my-app-id' }),        
        AppModule,
        ServerModule

    ],
    // Since the bootstrapped component is not inherited from your
    // imported AppModule, it needs to be repeated here.
    bootstrap: [AppComponent],
    declarations: [],
})
export class AppServerModule { }