// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// @Injectable({
//   providedIn: 'root',
// })
// export class PilotoService {
//   endpoint = 'http://localhost:8080/api/pilotos';

//   constructor(private HttpClient: HttpClient) {}

//   getPilotos() {
//     return this.HttpClient.get(this.endpoint);
//   }
// }

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class Piloto {
  id: number;
  nombre: string;
  apellido: string;
  escuderia: string;
  numero: string;
}

@Injectable({
  providedIn: 'root',
})
export class PilotoService {
  endpoint = 'http://localhost:8080/api/pilotos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  //ATENCION A ESTE METODO PUEDE SER IMPRESCINDIBLE

  // createPiloto(piloto: Piloto): Observable<any> {
  //   return this.httpClient
  //     .post<Piloto>(this.endpoint, JSON.stringify(piloto), this.httpOptions)
  //     .pipe(catchError(this.handleError<Piloto>('Error occured')));
  // }

  createPiloto(piloto, blob) {
    let formData = new FormData();
    formData.append('nombre', piloto.nombre);
    formData.append('apellido', piloto.apellido);
    formData.append('escuderia', piloto.escuderia);
    formData.append('numero', piloto.numero);
    formData.append('file', blob);

    return this.httpClient.post(this.endpoint, formData);
  }

  // getPiloto(id): Observable<Piloto[]> {
  //   return this.httpClient.get<Piloto[]>(this.endpoint + '/' + id).pipe(
  //     tap((_) => console.log(`Piloto fetched: ${id}`)),
  //     catchError(this.handleError<Piloto[]>(`Get piloto id=${id}`))
  //   );
  // }
  getPiloto(id) {
    return this.httpClient.get<Piloto[]>(this.endpoint + '/' + id).pipe(
      tap((_) => console.log(`Piloto fetched: ${id}`)),
      catchError(this.handleError<Piloto[]>(`Get piloto id=${id}`))
    );
  }

  getPilotos(): Observable<Piloto[]> {
    return this.httpClient.get<Piloto[]>(this.endpoint).pipe(
      tap((users) => console.log('piloto retrieved!')),
      catchError(this.handleError<Piloto[]>('Get piloto', []))
    );
  }

  updatePiloto(id, piloto: Piloto): Observable<any> {
    return this.httpClient
      .put(this.endpoint + '/' + id, JSON.stringify(piloto), this.httpOptions)
      .pipe(
        tap((_) => console.log(`Piloto updated: ${id}`)),
        catchError(this.handleError<Piloto[]>('Update piloto'))
      );
  }

  // deletePiloto(id): Observable<Piloto[]> {
  //   return this.httpClient
  //     .delete<Piloto[]>(this.endpoint + '/' + id, this.httpOptions)
  //     .pipe(
  //       tap((_) => console.log(`Piloto deleted: ${id}`)),
  //       catchError(this.handleError<Piloto[]>('Delete piloto'))
  //     );
  // }

  deletePiloto(id) {
    return this.httpClient
      .delete<Piloto[]>(this.endpoint + '/' + id, this.httpOptions)
      .pipe(
        tap((_) => console.log(`Piloto deleted: ${id}`)),
        catchError(this.handleError<Piloto[]>('Delete piloto'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
