import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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

import { MaterialModule } from './material.module';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { NoteDialogComponent } from './note-dialog/note-dialog.component';
import { StudentDialogUpdComponent } from './student-dialog-upd/student-dialog-upd.component';
import { CursoDialogUpdComponent } from './curso-dialog-upd/curso-dialog-upd.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StudentListComponent,
    CursoComponent,
    NotaComponent,
    StudentDialogComponent,
    NoteDialogComponent,
    StudentDialogComponent,
    StudentDialogUpdComponent,
    CursoDialogUpdComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [
    StudentDialogComponent,
    NoteDialogComponent,
    StudentDialogUpdComponent,
    CursoDialogUpdComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
