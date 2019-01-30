import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
courses: any[];
students: any[];
  constructor(private http: ApiService) { }

  ngOnInit() {
  }

  getAllCourses() {
    this.http.getCourses().subscribe(courses => {
      this.courses = courses;
      console.log('el servicio : ', courses);
    });
  }

  getAllStudents() {
    this.http.getStudents().subscribe(students => {
      this.students = students;
      console.log('el servicio students: ', students);
    });
  }

}
