import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
const urlApi = environment.url + 'usuario';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private route: Router, private storgaSrv: StorageService) { }
  usuario = null;

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
    this.usuario = await this.storgaSrv.getJsonValue('usuario');
    // this.usuario = JSON.parse(await localStorage.getItem('usuario'));
  }

  login(usuario: Usuario) {
    return this.http.post(`${urlApi}/auth`, usuario);
  }
  logout() {
    this.removerDataUsuario();
  }

  removerDataUsuario() {
    this.storgaSrv.removeJsonValue('token');
    this.storgaSrv.removeJsonValue('usuario');
  }
}
