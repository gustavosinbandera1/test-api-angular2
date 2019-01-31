import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-curso-dialog-upd',
  templateUrl: './curso-dialog-upd.component.html',
  styleUrls: ['./curso-dialog-upd.component.css']
})
export class CursoDialogUpdComponent implements OnInit {

  cursoName   = new FormControl();
  cursoCode = new FormControl();
  curso: any[] = [];
  object = {};



  constructor(@Inject(MAT_DIALOG_DATA) public dataModal: any, private api: ApiService) {
    this.curso = dataModal['data'];
    console.log('el curso', this.curso);


  }

  ngOnInit() {
  }

  saveData() {
    /*check changes*/
    console.log('saliendo del modal', this.curso[0]);
           this.api.updateItem(this.curso[0], 'cursos')
            .subscribe(data => {
              console.log('el curso se actualizo con exito', data);
            });
  }


  onNameChange(nameChange) {
    console.log( nameChange);
    this.curso[0].name = nameChange;
  }

  onCodeChange(codeChange) {
    console.log(codeChange);
    this.curso[0].cursoCode = codeChange;

  }



}
