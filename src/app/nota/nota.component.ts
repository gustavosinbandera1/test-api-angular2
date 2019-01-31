import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


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
  courses: any = [];
  students: any = [];
  notes: any = [];

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(private api: ApiService) {

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

  createNote() {
    
  }

}
