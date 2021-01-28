import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  passwordVisible = false;
  password?: string;
  loading = false;
  error: string;
  constructor(private message: NzMessageService, private route: Router, private fb: FormBuilder, private storageSrv: StorageService, private usuarioSrv: UsuarioService) {
    this.cargarRecuerdame();
  }
  usuario = new Usuario();
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      usuario: [this.usuario.usuario, [Validators.required]],
      password: [this.usuario.password, [Validators.required]],
      recuerdame: [this.usuario.recuerdame],
    });
  }
  submitForm(): void {
    this.error = null;
    if (this.validateForm.invalid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.loading = true;
    this.usuario = this.validateForm.value;
    this.usuarioSrv.login(this.usuario).subscribe(async res => {
      this.loading = false;
      this.recuerdame();
      await this.storageSrv.setJsonValue('token', res);
      await this.storageSrv.setJsonValue('usuario', this.usuario);
      this.route.navigateByUrl('/');
      this.message.success(`Bienvenido ${this.usuario.usuario}`);
    }, err => {
      this.loading = false;
      this.error = err.error.mensaje;
    });

  }
  async recuerdame() {
    const res = this.validateForm.value.recuerdame;
    // await localStorage.removeItem('recuerdame');
    if (res) {
      await this.storageSrv.setJsonValue('recuerdame', this.usuario);
      // await localStorage.setItem('recuerdame', JSON.stringify(this.usuario));
    } else {
      await this.storageSrv.setJsonValue('recuerdame', { recuerdame: false });
      // await localStorage.setItem(
      //   'recuerdame',
      //   JSON.stringify({ recuerdame: false })
      // );
    }
  }
  async cargarRecuerdame() {
    // this.usuario = JSON.parse(await localStorage.getItem('recuerdame')) || new Usuario();
    this.usuario = (await this.storageSrv.getJsonValue('recuerdame')) || new Usuario();
  }
}
