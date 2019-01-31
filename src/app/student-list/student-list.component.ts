import { Component, OnInit,  ViewChild, Inject} from '@angular/core';
import { Student } from '../models/student';

import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'studentCode', 'actions'];
  student: Student[] = [];
  studentNotes: any[] = [];
  name = new FormControl();
  age = new FormControl();
  studentCode = new FormControl();
  dataSource = this.student;
  object = {};

  constructor(private api: ApiService,  public dialog: MatDialog) {
    this.api.getStudents().subscribe((students) => {
      this.student = students;
      console.log('los estudiantes', students);
      this.dataSource = students;
    });
   }

  ngOnInit() {

  }



  registerStudent() {

    this.api.createStudent(this.object).subscribe((data) => {
      this.student = [
        ...this.student,
        data
      ];
    });
  }

  updateStudent(student) {
    console.log('update student', student);

  }

  deleteStudent(student) {
    console.log('delete student', student);
    this.api.deleteItem(student._id, 'students').subscribe(data => {

    });
  }

  viewStudent(student) {
    console.log('update student', student);
  }

  onNameChange() {
    console.log('el cambio', this.name.value);
    this.object['name'] = this.name.value;
  }

  onAgeChange() {
    console.log('el cambio', this.age.value);
    this.object['age'] = this.age.value;
  }

  onCodeChange() {
    console.log('el cambio', this.studentCode.value);
    this.object['studentCode'] = this.studentCode.value;
  }

  openModal(data: any) {
    this.getStudentNotes(data).subscribe(notes => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        notes: notes
      };
      const dialogRef = this.dialog.open(StudentDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        console.log('se cerro la ventana modal');

      });
    });

  }

  getStudentNotes(student): Observable<any> {
    return this.api.getNotesByStudentId(student._id); /* .subscribe(data => {
      console.log('los datosque se recibieron despues de buscar notas', data);
      this.studentNotes = data;

    }); */
  }

}
