import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cotizacion } from '../../../models/cotizacion';
import { CotizacionService } from '../../../services/cotizacion.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { es_ES, NzI18nService, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/cliente';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto';
import { Categoria } from '../../../models/categoria';
@Component({
  selector: 'app-edit-cotizacion',
  templateUrl: './edit-cotizacion.component.html',
  styleUrls: ['./edit-cotizacion.component.css']
})
export class EditCotizacionComponent implements OnInit {
  id: any;
  subtitulo = 'Nueva cotización';
  validateForm!: FormGroup;
  cotizacion: Cotizacion = new Cotizacion();
  error: any;
  cargando = false;
  filteredOptions: Cliente[] = [];
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente = new Cliente();
  productosCategorizados: Categoria[] = [];
  @ViewChild('identificador', { static: true }) identificador: ElementRef;
  // tslint:disable-next-line: max-line-length
  constructor(private i18n: NzI18nService, private notification: NzNotificationService, private ar: ActivatedRoute, private route: Router, private fb: FormBuilder, private cotiSrv: CotizacionService, private clienteSrv: ClienteService, private productSrv: ProductoService) {
    this.crearFormulario();
    this.i18n.setLocale(es_ES);
    this.clienteSrv.listar().subscribe(res => {
      if (res.ok === true) {
        this.clientes.push(...res.clientes);
      }
    });
    this.productSrv.categorizar().subscribe(res => {
      if (res.ok === true) {
        this.productosCategorizados.push(...res.categorias);
      }
    });
    this.ar.params.subscribe(p => {
      this.id = p.id;
      if (this.id === 'nuevo') {
        this.agregarDetalles();
      } else {
        this.subtitulo = 'Actualizar cotización';
        this.getCotizacion();
      }
    });
  }
  ngOnInit(): void {
  }
  onChange(value: string): void {
    if (value.length > 0) {
      this.filteredOptions = this.clientes.filter((cliente: Cliente) => {
        const nombreCliente = cliente.nombre.toLowerCase();
        const busqueda = value.toLowerCase();
        return nombreCliente.indexOf(busqueda) !== -1;
      });
    } else {
      this.filteredOptions = [];
    }
  }
  submitForm(): void {
    if (this.validateForm.invalid) {
      // tslint:disable-next-line: forin
      // for (const i in this.validateForm.controls) {
      //   this.validateForm.controls[i].markAsDirty();
      //   this.validateForm.controls[i].updateValueAndValidity();
      // }
      Object.values(this.validateForm.controls).forEach(control => {
        if (control instanceof FormArray) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values(control.controls).forEach(control => {
            if (control instanceof FormGroup) {
              // tslint:disable-next-line: no-shadowed-variable
              Object.values(control.controls).forEach(control => {
                control.markAsDirty();
                control.updateValueAndValidity();
              });
            } else {
              control.markAsDirty();
              control.updateValueAndValidity();
            }
          });
        } else {
          if (control instanceof FormGroup) {
            // tslint:disable-next-line: no-shadowed-variable
            Object.values(control.controls).forEach(control => {
              control.markAsDirty();
              control.updateValueAndValidity();
            });
          } else {
            control.markAsDirty();
            control.updateValueAndValidity();
          }

        }
      });
      return;
    }
    this.cargando = true;
    this.error = null;
    this.cotizacion = this.validateForm.value;
    this.cotizacion.id = this.id;
    this.cotizacion.cliente = this.clienteSeleccionado;
    console.log(this.cotizacion);
    if (this.id === 'nuevo') {
      this.cotiSrv.guardar(this.cotizacion).subscribe(res => {
        this.cargando = false;
        if (res.ok === true) {
          this.notification.create(
            'success', 'Correcto', res.mensaje
          );
          this.route.navigateByUrl('/cotizacion');
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
    this.route.navigateByUrl('/cotizacion');
  }

  async getCotizacion(): Promise<any> {
    await this.cotiSrv.get(this.id).subscribe(res => {
      if (res.ok === true) {
        this.cotizacion = res.cotizacion;
        this.crearFormulario();
      }
    });
  }
  crearFormulario(): void {
    this.validateForm = this.fb.group({
      fecha: [this.cotizacion.fecha, [Validators.required]],
      nombre: [this.cotizacion.cliente.nombre, [Validators.required]],
      identificador: [this.cotizacion.cliente.identificador, [Validators.required]],
      detalles: this.fb.array([])
    });
  }
  seleccionado(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.validateForm.get('identificador').reset(cliente.identificador);
  }
  consumidorFinal(): void {
    this.validateForm.get('identificador').reset('1111111111');

  }
  get detalles(): FormArray {
    return this.validateForm.get('detalles') as FormArray;
  }
  agregarDetalles(): void {
    this.detalles.push(this.fb.group({
      producto: [null, [Validators.required]],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      descripcion: [null, [Validators.maxLength(20)]]
    }));
  }
  eliminarDetalle(i: number): void {
    if (this.detalles.controls.length > 1) {
      this.detalles.removeAt(i);
    }
  }
}
