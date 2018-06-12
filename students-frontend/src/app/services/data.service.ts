import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap, map, catchError} from 'rxjs/operators';
import {Student} from '../models';
import {STUDENTS} from '../other';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private static studentsUrl = 'http://localhost:8080/public/students';
  private static httpOptions = {
    headers: DataService.createHeaders('')
  };

  static createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': ''
    });
  }

  constructor(private http: HttpClient) {
  }


  setToken(token: string) {
    DataService.httpOptions.headers = DataService.createHeaders(token);
  }

  getMockStudents(): Student[] {
    return STUDENTS;
  }

  /** GET students from the server */
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(DataService.studentsUrl, DataService.httpOptions);
  }

  /** POST: add a new student to the server */
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(DataService.studentsUrl, student, DataService.httpOptions).pipe(
      tap((studentAdded: Student) => this.log(`added student id=${studentAdded.id}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  /** GET student by id. Will 404 if id not found */
  getStudent(id: number): Observable<Student> {
    const url = `${DataService.studentsUrl}/${id}`;
    return this.http.get<Student>(url, DataService.httpOptions).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`getStudent id=${id}`))
    );
  }

  /** DELETE: delete the student from the server */
  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.id;
    const url = `${DataService.studentsUrl}/${id}`;
    return this.http.delete<Student>(url, DataService.httpOptions).pipe(
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** PUT: update the student on the server */
  updateStudent(student: Student): Observable<any> {
    return this.http.put(DataService.studentsUrl, student, DataService.httpOptions).pipe(
      tap(_ => this.log(`updated student id=${student.id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('StudentService: ' + message);
  }
}
