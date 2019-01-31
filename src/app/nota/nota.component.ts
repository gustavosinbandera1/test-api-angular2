import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { template } from '@angular/core/src/render3';
export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {
  displayedColumns: string[] = ['name', 'nombre_evaluacion', 'calificacion' , 'curso', 'actions'];
  courses: any = [];
  students: any = [];
  notes: any = [];
  calificacion = new FormControl();
  nombre_evaluacion =  new FormControl();
  object: any = {};
  temp: any[] = [];

  constructor(private api: ApiService, public dialog: MatDialog) {

    this.api.getItems('cursos').subscribe((courses) => {
      this.courses = courses;
      console.log('los cursos', courses);
    });

    this.api.getItems('estudiantes').subscribe((students) => {
      console.log('los estudiantes', students);
      this.students = students;
    });

    this.api.getItems('notas').subscribe((notes) => {
      console.log('las notas', notes);
      this.notes = notes;
    });
  }

  ngOnInit() {
  }

  onNameTestChange() {
     console.log('el cambio', this.nombre_evaluacion.value);
    this.object['nombre_evaluacion'] = this.nombre_evaluacion.value;
  }

  onCalificacionChange() {
     console.log('el cambio', this.calificacion.value);
    this.object['calificacion'] = this.calificacion.value;
  }

  changeStudent(selectedId) {
     console.log('el seleccionado es:', selectedId);
      this.object['id_estudiante'] = selectedId;
  }

  changeCourse(courseId) {
    console.log('el seleccionado es:', courseId);
      this.object['id_curso'] = courseId;
  }
  createNote() {
    this.api.createItem(this.object, 'notas').subscribe(data => {
      console.log('esto llega del servicio', data);
      this.notes = [
        ...this.notes,
        data
      ];
    });
  }

  deleteNota() {

  }

  updateNota() {

  }

  openModal(data: any) {
    console.log('el dato para el modal', data);
    this.temp.push(data);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        notes: this.temp
      };
      const dialogRef = this.dialog.open(NoteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log('se cerro la ventana modal');
        this.temp = [];
      });

    }
}
