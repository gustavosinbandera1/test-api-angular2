import { Component, OnInit } from '@angular/core';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-text-field';
import { FormGroup, FormControl } from '@angular/forms';
import { Student } from '../models/student';


import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {
  student: Student[] = [];
  _id = null;

  form = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(''),
    studentCode: new FormControl('')
  });

  constructor(private api: ApiService) {
    this.api.getStudents().subscribe((students) => {
      this.student = students;
      console.log('los estudiantes', students);

    });
   }

  ngOnInit() {
  }

  addStudent() {
    const name = this.form.value.name;
    const age = this.form.value.age;
    const studentCode = this.form.value.studentCode;
    const student: Student = {
      name: name,
      age: age,
      studentCode: studentCode
    };
    this.api.createStudent(student).subscribe((data) => {
      this._id = data._id;
      this.student = [
        ...this.student,
        data
      ];
    });
  }

}
