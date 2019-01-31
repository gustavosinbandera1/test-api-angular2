import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'nombre_evaluacion', 'calificacion' , 'curso', 'actions'];
  courses: any = [];
  students: any = [];
  notes: any = [];
  calificacion = new FormControl();
  nombre_evaluacion =  new FormControl();
  object: any = {};
  temp: any[] = [];

public dataSource = new MatTableDataSource;
@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService,
        public dialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef) {

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
      this.dataSource.data = notes;
    });
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      this.dataSource.data = this.notes;
    });
  }


  deleteNote(note) {
    this.api.deleteItem(note._id, 'notas').subscribe(data => {
      this.notes.splice(this.notes.findIndex(({_id}) => _id === data._id), 1);
      this.dataSource.data = this.notes;
    });
  }



  openModal(data: any) {
    this.temp.push(data);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        notes: this.temp
      };
      const dialogRef = this.dialog.open(NoteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        this.temp = [];
      });

  }

}
