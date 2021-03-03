import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, first, catchError } from 'rxjs/operators';
import { Trial } from '../model';

import { environment } from '../../../environments/environment';

interface Res {
  message: string,
  data: Trial
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient) { }

  public apiUrl: string = environment.path;

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Status Code: ${error.status}, ` +
        `Message: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  submitData(data) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');

    return this.http.post<Res>(`/.netlify/functions/postTrial`, data, { headers: headers }).pipe(
      catchError(this.handleError)
    );

  }
}
