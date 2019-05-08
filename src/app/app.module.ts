import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'


import { AppComponent } from './app.component';
import {MatButtonModule,MatIconModule,MatGridListModule, MatInputModule,MatCardModule,MatButtonToggleModule } from '@angular/material'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,MatButtonModule,MatIconModule,
    MatGridListModule,BrowserAnimationsModule,
     MatInputModule,MatCardModule,MatButtonToggleModule,
     FormsModule, ReactiveFormsModule,
     HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
