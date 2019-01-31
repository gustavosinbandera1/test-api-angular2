import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-student-dialog-upd',
  templateUrl: './student-dialog-upd.component.html',
  styleUrls: ['./student-dialog-upd.component.css']
})
export class StudentDialogUpdComponent implements OnInit {

  studentName   = new FormControl();
  age = new FormControl();
  studentCode = new FormControl();
  student: any[] = [];
  object = {};



  constructor(@Inject(MAT_DIALOG_DATA) public dataModal: any, private api: ApiService) {
    this.student = dataModal['data'];
    console.log('el estudiante', this.student);


  }

  ngOnInit() {
  }

  saveData() {
    /*check changes*/
    console.log('saliendo del modal', this.student[0]);
           this.api.updateItem(this.student[0], 'estudiantes')
            .subscribe(data => {
              console.log('el estudiante se actualizo con exito', data);
            });
  }

  onNameStudentChange(student, nameChange) {
    console.log( student, nameChange, this.studentName);

  }




  onNameChange(nameChange) {
    console.log( nameChange);
    this.student[0].name = nameChange;
  }
   onAgeChange(ageChange) {
    console.log(ageChange);
    this.student[0].age = ageChange;
  }

  onCodeChange(codeChange) {
    console.log(codeChange);
    this.student[0].studentCode = codeChange;

  }



}
