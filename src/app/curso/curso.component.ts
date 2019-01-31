import { Component, OnInit,  ViewChild} from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';
import { Course } from '../models/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})

export class CursoComponent  {
  displayedColumns: string[] = ['name', 'cursoCode', 'actions'];
  course: Course[] = [];
  //dataSource = this.course;
  object = {};
  name = new FormControl();
  cursoCode = new FormControl();


  constructor(private api: ApiService) {
    this.api.getItems('cursos').subscribe((courses) => {
      this.course = courses;
      console.log('los cursos', courses);
      //this.dataSource = courses;
    });


  }



  registerCourse() {

    this.api.createItem(this.object, 'cursos').subscribe((data) => {
      this.course = [
        ...this.course,
        data
      ];
    });
  }
  deleteCourse(course) {
    console.log('delete course', course);
    this.api.deleteItem(course._id, 'cursos').subscribe(data => {
      console.log('se elimino el curso');
      this.dataSource = [...this.course];
    });
  }

  onNameChange() {
    console.log('el cambio', this.name.value);
    this.object['name'] = this.name.value;
  }

  onCodeChange() {
     console.log('el cambio', this.name.value);
    this.object['cursoCode'] = this.cursoCode.value;
  }

  updateCurso(curso) {
    console.log('update curso', curso);

  }

  deleteCurso(curso) {
    console.log('delete curso', curso);
    this.api.deleteItem(curso._id, 'cursos').subscribe(data => {

    });
  }

  viewCurso(curso) {
    console.log('ver curso', curso);
  }


}





