import { Component, OnInit,  ViewChild} from '@angular/core';
import { Student } from '../models/student';


import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'studentCode', 'actions'];
  student: Student[] = [];
  name = new FormControl();
  age = new FormControl();
  studentCode = new FormControl();
  dataSource = this.student;
  object = {};

  constructor(private api: ApiService) {
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


}
