import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { BackEndComponent } from './back-end/back-end.component';
import { DatosSqlComponent } from './datos-sql/datos-sql.component';
import { FrontEndComponent } from './front-end/front-end.component';
import { MatToolbarModule } from '@angular/material/toolbar'; // Para la barra de herramientas de Material
import { MatButtonModule } from '@angular/material/button'; // Para los botones de Material
import { MatIconModule } from '@angular/material/icon'; // Para los íconos de Material
import { HttpClientModule } from '@angular/common/http'; // Para las peticiones HTTP
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BackEndComponent,
    DatosSqlComponent,
    FrontEndComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule, // Material toolbar
    MatButtonModule, // Material button
    MatIconModule, // Material icon
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
