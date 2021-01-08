import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
const urlApi = environment.url + 'producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  guardar(producto: Producto): Observable<any> {
    return this.http.post(`${urlApi}`, producto);
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
  actualizar(producto: Producto): Observable<any> {
    return this.http.put(`${urlApi}/${producto.id}`, producto);
  }
  categorizar(): Observable<any> {
    return this.http.get(`${urlApi}/all/categoria`);
  }
}
