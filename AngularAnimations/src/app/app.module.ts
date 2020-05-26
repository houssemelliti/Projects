import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './routes/home.component';
import { BasicComponent } from './routes/basic.component';
import { ContainedComponent } from './routes/contained.component';
import { AdvancedComponent } from './routes/advanced.component';
import { AnimboxComponent } from './animbox.component';
import {MouseComponent} from './mouse.component';
import {FadeBlockComponent} from './fadeblock.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BasicComponent,
    ContainedComponent,
    AdvancedComponent,
    AnimboxComponent,
    MouseComponent,
    FadeBlockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
