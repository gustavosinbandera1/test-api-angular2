import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentListComponent } from './student-list/student-list.component';

import { HttpClientModule } from '@angular/common/http';
import {ApiService} from './services/api.service';
import { CursoComponent } from './curso/curso.component';
import { NotaComponent } from './nota/nota.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StudentListComponent,
    CursoComponent,
    NotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
