import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../../../../assets/url.config';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { RequestClientCreate, ResponseClientGetAll } from '../Interfaces/client.interface';
import moment_ from 'moment';
const moment = moment_;

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private data = new BehaviorSubject("");
  getMessage = this.data.asObservable();

  constructor(private http: HttpClient) { }

  setData(data: any) {
    this.data.next(data);
  }

  getAllClients() {
    return this.http.get<ResponseClientGetAll[]>(urls.getAllClient).pipe(
      map((resp) =>  {
        return resp;
      }),
      catchError((error: Error) => throwError(error))
    )
  }

  insertNewClient(request: RequestClientCreate) {

    request.birthDate = this.editDate(request.birthDate);

    return this.http.post<Observable<any>>(urls.insertNewClient, request).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((error: Error) => throwError(error))
    );
  }

  private editDate(date: string): string {
    return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
  }
}
