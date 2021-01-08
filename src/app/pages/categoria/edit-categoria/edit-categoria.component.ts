import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/categoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../services/categoria.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css']
})
export class EditCategoriaComponent implements OnInit {
  id: any;
  validateForm!: FormGroup;
  categoria: Categoria = new Categoria();
  error: any;
  cargando = false;
  subtitulo = 'Agregar categoria';
  // tslint:disable-next-line: max-line-length
  constructor(private r: Router, private router: ActivatedRoute, private fb: FormBuilder, private notification: NzNotificationService, private categSrv: CategoriaService) {
    this.crearFormulario();
    this.router.params.subscribe(p => {
      this.id = p.id;
      if (this.id !== 'nuevo') {
        this.subtitulo = 'Actualizar categoria';
        this.getCliente();
      }
    });
  }

  ngOnInit(): void {
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
    this.categoria = this.validateForm.value;
    this.categoria.id = this.id;
    if (this.id === 'nuevo') {
      this.categSrv.guardar(this.categoria).subscribe(res => {
        this.cargando = false;
        if (res.ok === true) {
          this.notification.create(
            'success', 'Correcto', res.mensaje
          );
          this.r.navigateByUrl('/categoria');
        }
      }, (err: HttpErrorResponse) => {
        this.cargando = false;
        if (err.status === 422) {
          this.error = err.error;
        }
      });
    } else {
      this.categSrv.actualizar(this.categoria).subscribe(res => {
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
    this.r.navigateByUrl('/categoria');
  }

  async getCliente(): Promise<any> {
    await this.categSrv.get(this.id).subscribe(res => {
      if (res.ok === true) {
        this.categoria = res.categoria;
        this.crearFormulario();
      }
    });
  }

  crearFormulario(): void {
    this.validateForm = this.fb.group({
      nombre: [this.categoria.nombre, [Validators.required]],

    });
  }
}
