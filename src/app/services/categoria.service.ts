import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
const urlApi = environment.url + 'categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
  guardar(categoria: Categoria): Observable<any> {
    return this.http.post(`${urlApi}`, categoria);
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
  actualizar(categoria: Categoria): Observable<any> {
    return this.http.put(`${urlApi}/${categoria.id}`, categoria);
  }
}
