import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RecipesModule} from './recipes/recipes.module';
import {RouterModule} from '@angular/router';
import {APP_EXTRA_OPTIONS,APP_ROUTES} from './app.routes';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    NavbarComponent    
  ],
  imports: [
    BrowserModule,
    RecipesModule,
    RouterModule.forRoot([...APP_ROUTES],{...APP_EXTRA_OPTIONS}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
