import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Producto } from '../../../models/producto';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {
  id: any;
  validateForm!: FormGroup;
  producto: Producto = new Producto();
  error: any;
  cargando = false;
  subtitulo = 'Agregar producto';
  index = 0;
  categorias: Categoria[] = [];
  parserDollar = (value: string) => value.replace('$ ', '');
  formatterDollar = (value: number) => `$ ${value}`;
  // tslint:disable-next-line: max-line-length
  constructor(private r: Router, private router: ActivatedRoute, private fb: FormBuilder, private notification: NzNotificationService, private prodSrv: ProductoService, private CategSrv: CategoriaService) {
    this.cargarcategorias();
    this.crearFormulario();
    this.router.params.subscribe(p => {
      this.id = p.id;
      if (this.id !== 'nuevo') {
        this.subtitulo = 'Actualizar producto';
        this.getCliente();
      }
    });
  }
  addItem(input: HTMLInputElement): void {
    const value = input.value;
    // if (this.categorias.indexOf(value) === -1) {
    //   this.categorias = [...this.categorias, input.value || `New item ${this.index++}`];
    // }
    if (value.length > 0) {
      const find = this.categorias.some(cat => {
        return (cat.nombre).toLowerCase() === value.toLowerCase();
      });
      if (!find) {
        const nCateg = new Categoria();
        nCateg.nombre = value;
        this.CategSrv.guardar(nCateg).subscribe(res => {
          if (res.ok === true) {
            this.categorias.push(res.categoria);
            this.notification.create(
              'success', 'Correcto', res.mensaje
            );
            input.value = '';
          }
        });
      }
    }
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
    this.producto = this.validateForm.value;
    this.producto.id = this.id;
    if (this.id === 'nuevo') {
      this.prodSrv.guardar(this.producto).subscribe(res => {
        this.cargando = false;
        if (res.ok === true) {
          this.notification.create(
            'success', 'Correcto', res.mensaje
          );
          this.r.navigateByUrl('main/producto');
        }
      }, (err: HttpErrorResponse) => {
        this.cargando = false;
        if (err.status === 422) {
          this.error = err.error;
        }
      });
    } else {
      this.prodSrv.actualizar(this.producto).subscribe(res => {
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
    this.r.navigateByUrl('main/producto');
  }

  async getCliente(): Promise<any> {
    await this.prodSrv.get(this.id).subscribe(res => {
      if (res.ok === true) {
        this.producto = res.producto;
        // if (this.producto.categoria.estado  || this.producto.categoria.estado === 0) {
        //   this.producto.categoria_id = null;
        // }
        this.crearFormulario();
      }
    });
  }

  crearFormulario(): void {
    this.validateForm = this.fb.group({
      nombre: [this.producto.nombre, [Validators.required]],
      categoria_id: [this.producto.categoria_id, [Validators.required]],
      precio: [this.producto.precio, [Validators.required, Validators.min(1)]]
    });
  }
  cargarcategorias(): void {
    this.CategSrv.listar().subscribe(res => {
      if (res.ok === true) {
        this.categorias.push(...res.categorias);
      }
    });
  }
}
