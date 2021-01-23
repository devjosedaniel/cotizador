import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
const urlApi = environment.url + 'usuario';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private route: Router) {}
  usuario;
  auth() {}
  async validarUsuario(): Promise<boolean> {
    await this.cargarUsuario();
    return new Promise<boolean>((resolve) => {
      if (this.usuario) {
        resolve(true);
      } else {
        this.route.navigateByUrl('auth');
        resolve(false);
      }
    });
  }
  async cargarUsuario() {
    this.usuario = JSON.parse(await localStorage.getItem('usuario'));
  }
  guardar() {}
  login() {}
  logout() {}
}
