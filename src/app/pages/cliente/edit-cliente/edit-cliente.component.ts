import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../models/cliente';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {
  id: any;
  validateForm!: FormGroup;
  cliente: Cliente = new Cliente();
  error: any;
  cargando = false;
  subtitulo = 'Agregar cliente';
  // tslint:disable-next-line: max-line-length
  constructor(private r: Router, private router: ActivatedRoute, private fb: FormBuilder, private notification: NzNotificationService, private clienteSrv: ClienteService) {
    this.crearFormulario();
    this.router.params.subscribe(p => {
      this.id = p.id;
      if (this.id !== 'nuevo') {
        this.subtitulo = 'Actualizar cliente';
        this.getCliente();
      }
    });
  }

  async ngOnInit(): Promise<any> {

  }
  submitForm(): void {
    if (this.validateForm.invalid) {
      // tslint:disable-next-line: forin
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.cargando = true;
    this.error = null;
    this.cliente = this.validateForm.value;
    this.cliente.id = this.id;
    if (this.id === 'nuevo') {
      this.clienteSrv.guardar(this.cliente).subscribe(res => {
        this.cargando = false;
        if (res.ok === true) {
          this.notification.create(
            'success', 'Correcto', res.mensaje
          );
          this.r.navigateByUrl('main/cliente');
        }
      }, (err: HttpErrorResponse) => {
        this.cargando = false;
        if (err.status === 422) {
          this.error = err.error;
        }
      });
    } else {
      this.clienteSrv.actualizar(this.cliente).subscribe(res => {
        this.cargando = false;
        if (res.ok === true) {
          this.notification.create(
            'success', 'Correcto', res.mensaje
          );
        }
      }, (err: HttpErrorResponse) => {
        this.cargando = false;
        if (err.status === 422) {
          this.error = err.error;
        }
      });
    }
  }
  onBack(): void {
    this.r.navigateByUrl('main/cliente');
  }

  async getCliente(): Promise<any> {
    await this.clienteSrv.get(this.id).subscribe(res => {
      if (res.ok === true) {
        this.cliente = res.cliente;
        this.crearFormulario();
      }
    });
  }

  crearFormulario(): void {
    this.validateForm = this.fb.group({
      nombre: [this.cliente.nombre, [Validators.required]],
      direccion: [this.cliente.direccion, [Validators.required]],
      telefono: [this.cliente.telefono, [Validators.required]],
      identificador: [this.cliente.identificador, [Validators.required]],
      email: [this.cliente.email, [Validators.email, Validators.required]],
    });
  }
}
