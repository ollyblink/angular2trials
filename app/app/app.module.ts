import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpModule}    from '@angular/http';

import {routing} from './app.routing';
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {DataComponent} from "../data/owndata/data.component";
import {LogoutComponent} from "../logout/logout.component";
import {ConsentDataComponent} from "../data/consentdata/consentdata.component";
import {GrantConsentComponent} from "../data/grantconsent/grantconsent.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DataComponent,
    ConsentDataComponent,
    LogoutComponent,
    GrantConsentComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
