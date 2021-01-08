import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
const urlApi = environment.url + 'cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  guardar(cliente: Cliente): Observable<any> {
    return this.http.post(`${urlApi}`, cliente);
  }
  listar(): Observable<any> {
    return this.http.get(`${urlApi}`);
  }
  get(id: string): Observable<any> {
    return this.http.get(`${urlApi}/${id}`);
  }
  eliminar(id): Observable<any> {
    return this.http.delete(`${urlApi}/${id}`);
  }
  actualizar(cliente: Cliente): Observable<any> {
    return this.http.put(`${urlApi}/${cliente.id}`, cliente);
  }
}
