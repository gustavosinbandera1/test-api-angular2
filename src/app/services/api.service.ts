import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _url: any = 'http://localhost:3000';
 /*  private _url: any = 'https://nodejs-express-api.herokuapp.com'; */
  constructor(private http: HttpClient) { }

  getNotesByStudentId(studentId) {
    return this.http.get<any>(`${this._url}/api/notas/${studentId}`);
  }

  getStudents() {
    return this.http.get<any>(`${this._url}/students`)
      .pipe(
        map((data) => {
          if (data['results']) {
            return data['results'];
          } else {
            return data;
          }
        })
      );
  }

  getCourses() {
    return this.http.get<any>(`${this._url}/cursos`)
    .pipe(
      map((data) => {
        if (data['results']) {
          return data['results'];
        } else {
          return data;
        }
      })
    );
  }

  createStudent(student): Observable<any> {
    console.log('vamos a crear estudiante', student);


    return this.http.post<any>(`${this._url}/students`, student)
      .pipe(
        map((data) => {
          console.log('saliendo de map', data);

          return data;
        })
      );

  }


}
