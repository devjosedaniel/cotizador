import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cotizacion } from '../models/cotizacion';
const urlApi = environment.url + 'cotizacion';
@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(private http: HttpClient) { }

  guardar(cotizacion: Cotizacion): Observable<any> {
    return this.http.post(`${urlApi}`, cotizacion);
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
  actualizar(cotizacion: Cotizacion): Observable<any> {
    return this.http.put(`${urlApi}/${cotizacion.id}`, cotizacion);
  }
  generarPdf(id){
    return this.http.get(`${urlApi}/${id}/pdf`, { responseType: 'blob'});
  }
}
