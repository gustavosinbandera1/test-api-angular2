import { Component, OnInit,  ViewChild, Inject, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { Student } from '../models/student';

import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StudentDialogComponent } from '../student-dialog/student-dialog.component';
import { StudentDialogUpdComponent } from '../student-dialog-upd/student-dialog-upd.component';
import { Observable } from 'rxjs';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'age', 'studentCode', 'actions'];
  students: any = [];
  studentNotes: any[] = [];
  name = new FormControl();
  age = new FormControl();
  studentCode = new FormControl();
  object = {};
  temp: any[] = [];


  public dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService,
      public dialog: MatDialog,
      private changeDetectorRefs: ChangeDetectorRef) {

    this.api.getItems('estudiantes').subscribe((students) => {
    /*   this.dataSource = students; */
      this.students = students;
      this.dataSource.data = students;
      console.log('los estudiantes', students);

    });
  }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {

  }



  createStudent() {

    this.api.createItem(this.object, 'estudiantes').subscribe((data) => {
      this.students = [
        ...this.students,
        data
      ];
       this.dataSource.data = this.students;
      console.log('lo que creamos', this.students);

    });
  }



  deleteStudent(student) {
    this.dataSource.data = [];
    console.log('delete student', student);
    this.api.deleteItem(student._id, 'estudiantes').subscribe(data => {
      console.log('el dato subscrito:', data );

      this.students.splice(this.students.findIndex(({_id}) => _id === data._id), 1);
      console.log('el array reducido', this.students);

      this.dataSource.data = this.students;
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
      console.log('notes como array', notes);

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

  openModalUpdate(data: any) {
      this.temp.push(data);
      console.log('modal update', data);

      const dialogConfig2 = new MatDialogConfig();
      dialogConfig2.disableClose = true;
      dialogConfig2.autoFocus = true;
      dialogConfig2.data = {
        data: this.temp
      };
      const dialogRef = this.dialog.open(StudentDialogUpdComponent, dialogConfig2);
      dialogRef.afterClosed().subscribe(result => {
        console.log('se cerro la ventana modal 2', result);
        this.temp = [];

      });


  }


    getStudentNotes(student): Observable<any> {
    return this.api.getNotesByStudentId(student._id);
    }

}
