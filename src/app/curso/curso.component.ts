import { Component, OnInit,  ViewChild, Inject, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl } from '@angular/forms';
import { Course } from '../models/curso';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CursoDialogUpdComponent } from '../curso-dialog-upd/curso-dialog-upd.component';
@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})


export class CursoComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'cursoCode', 'actions'];
  courses: any[] = [];
  object = {};
  name = new FormControl();
  cursoCode = new FormControl();
  temp: any[] = [];

  public dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) {

    this.api.getItems('cursos').subscribe((courses) => {
      this.courses = courses;
      this.dataSource.data = courses;
      console.log('los cursos', courses);
    });


  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  createCourse() {

    this.api.createItem(this.object, 'cursos').subscribe((data) => {
      this.courses = [
        ...this.courses,
        data
      ];
      this.dataSource.data = this.courses;
    });
  }
  /* deleteCourse(course) {
    console.log('delete course', course);
    this.api.deleteItem(course._id, 'cursos').subscribe(data => {
      console.log('se elimino el curso');

      this.courses.splice(this.courses.findIndex(({_id}) => _id === data._id), 1);
      console.log('el array reducido', this.courses);

      this.dataSource.data = this.courses;
    });
  } */

  onNameChange() {
    console.log('el cambio', this.name.value);
    this.object['name'] = this.name.value;
  }

  onCodeChange() {
     console.log('el cambio', this.name.value);
    this.object['cursoCode'] = this.cursoCode.value;
  }



  deleteCurso(curso) {
    console.log('delete curso', curso);
    this.api.deleteItem(curso._id, 'cursos').subscribe(data => {
      this.courses.splice(this.courses.findIndex(({_id}) => _id === data._id), 1);
      console.log('el array reducido', this.courses);

      this.dataSource.data = this.courses;
    });
  }

  viewCurso(curso) {
    console.log('ver curso', curso);
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
    const dialogRef = this.dialog.open(CursoDialogUpdComponent, dialogConfig2);
    dialogRef.afterClosed().subscribe(result => {
      console.log('se cerro la ventana modal 2', result);
      this.temp = [];

    });
  }

}
