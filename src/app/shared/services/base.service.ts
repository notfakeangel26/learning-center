import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  basePath: string = `${ environment.serverBasePath }`;
  resourceEndPoint: string = '/resources';
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent){ // Esto podría indicar un error de red o un error en el cliente.
      // Pérdida de conexión a internet, un servidor caído, un cortafuegos bloqueando la comunicación, o cualquier
      // otro problema relacionado con la infraestructura de red.
      console.log(`An error occurred: ${ error.error.message }`);
    } else { // Significa que es un error de respuesta HTTP del servidor.
      // Unsuccessful Response Error Code Returned from Backend
      // Significa que ha recibido la solicitud del cliente, pero no pudo procesarla correctamente y devuelve una
      // respuesta con un código de estado HTTP que indica un error
      console.log(`Backend returned code ${error.status}, body wa ${error.error}`);
    }
    return throwError(()=>
      new Error('Something with request, please try again later'));
    // Indica que ha ocurrido un problema con la solicitud y sugiere que se intente nuevamente más tarde.
  }

  private resourcePath(){
    return `${this.basePath}${this.resourceEndPoint}`;
  }

  // Con el enfoque utilizando un BaseService genérico, no necesitas escribir la URL completa varias veces
  // en cada servicio o componente. En su lugar, solo necesitas llamar a métodos del BaseService y pasarle
  // los parámetros necesarios, como el nombre del recurso y los datos de la solicitud.

  // Create Resource
  create(item: any){
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Resource
  delete(id: any){
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Resource
  update(id: any, item: any){
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // GetAll
  getAll(){
    return this.http.get<T>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }



}
