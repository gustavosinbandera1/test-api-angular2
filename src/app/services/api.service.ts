import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _url: any = 'http://localhost:3000';
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
}
