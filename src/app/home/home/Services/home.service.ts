import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../../../../assets/url.config';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ResponseClientGetAll } from '../Interfaces/client.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAllClients() {
    return this.http.get<ResponseClientGetAll[]>(urls.getAllClient).pipe(
      map((resp) =>  {
        return resp;
      }),
      catchError((error: Error) => throwError(error))
    )
  }
}
