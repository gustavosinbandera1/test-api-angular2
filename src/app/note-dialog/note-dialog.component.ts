import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {
  notas: any;
  name_user   = new FormControl();
  name_course = new FormControl();
  calificacion = new FormControl();
  name_test = new FormControl();
  object = {};

/*variables de control de cambios*/
upd_name_student: any;
upd_name_curso: any;
upd_calificacion: any;
upd_evaluacion: any;

actualStudent: any;
actualCourse: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dataModal: any, private api: ApiService) {
    this.notas = dataModal['notes'];
   /*  this.name_user = this.notas.id_estudiante[name]; */
    console.log('las notas', this.notas[0]);


  }

  ngOnInit() {
  }

  saveData() {
    /*check changes*/
    console.log('saliendo del modal');

        if (this.actualStudent &&  this.actualStudent.name !== this.upd_name_student) {
          /*send request update to server*/
          this.actualStudent.name = this.upd_name_student;
          this.api.updateItem(this.actualStudent, 'estudiantes')
            .subscribe(data => {
              console.log('el estudiante se actualizo con exito', data);

            });
        }
        console.log('veamos el resultado: ', this.actualStudent);

        if (this.actualCourse && this.actualCourse.name !== this.upd_name_curso) {
          this.actualCourse.name = this.upd_name_curso;
          this.api.updateItem(this.actualCourse, 'cursos')
            .subscribe(data => {
              console.log('el curso se actualizo con exito', data);

            });
        }
        console.log('segundo resultado', this.actualCourse);



  }

  onNameStudentChange(student, nameChange) {
    console.log( student, nameChange, this.name_user);
    this.upd_name_student = nameChange;
    this.actualStudent = student;
  }

  onNameCourseChange(course, nameChange) {
    console.log( course, nameChange, this.name_course);
    this.upd_name_curso = nameChange;
    this.actualCourse = course;
  }
  onCalificacionChange(calificacion) {
    console.log(calificacion);
    this.upd_calificacion = calificacion;
  }

  onEvaluacionChange(evaluacion) {
    console.log(evaluacion);

  }

}
