import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
  notas: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dataModal: any) {
    this.notas = dataModal['notes'];
    console.log('las notas', this.notas);


  }

  ngOnInit() {
  }


}
