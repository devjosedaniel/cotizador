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
  dateFormat = 'yyyy/MM/dd';
  error: any;
  cargando = false;
  filteredOptions: Cliente[] = [];
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente = new Cliente();
  productosCategorizados: Categoria[] = [];
  porcetantajesIva = [0,12];
  productos: Producto[]= [];
  valor_subtotal: number = 0.00;
  valor_descuento: number = 0.00;
  valor_iva12: number = 0.00;
  valor_total: number = 0.00;
  @ViewChild('identificador', { static: true }) identificador: ElementRef;
  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
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
        for(const cat of this.productosCategorizados){
          for(const prod of cat.productos){
            this.productos.push(prod);
          }
        }
      }
    });
    this.ar.params.subscribe(p => {
      this.id = p.id;
      if (this.id === 'nuevo') {
        this.agregarDetalles();
      } else {
        this.subtitulo = 'Detalle cotización';
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
      this.clienteSeleccionado = new Cliente();
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
      final: [false],
      detalles: this.fb.array([]),
      valorsubtotal: [''],
      descuento: [0],
      valordescuento: [''],
      valoriva: [''],
      valortotal: ['']
    });
  }
  seleccionado(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.validateForm.get('identificador').reset(cliente.identificador);
  }
  quitarClienteSeleccionado(): void{
    this.clienteSeleccionado = new Cliente();
  }
  consumidorFinal(): void {
    if(this.validateForm.get('final').value === true){
      this.validateForm.get('identificador').reset('1111111111');
    }else{
      this.validateForm.get('identificador').reset('');
    }
  }
  get detalles(): FormArray {
    return this.validateForm.get('detalles') as FormArray;
  }
  agregarDetalles(): void {
    this.detalles.push(this.fb.group({
      producto_id: [null, [Validators.required]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      descripcion: [null, [Validators.maxLength(20)]],
      valorunitario: ['', [Validators.required]],
      iva: [12, [Validators.required]]
    }));
  }
  async eliminarDetalle(i: number) {
    if (this.detalles.controls.length > 1) {
      await this.detalles.removeAt(i);
      this.obtenerResultados();
    }

  }
  actualizarValor(value: string, i: number): void {
    const idproducto = this.detalles.controls[i].get('producto_id');
    const valor = this.detalles.controls[i].get('valorunitario');
    const cantidad = this.detalles.controls[i].get('cantidad');
    if(idproducto.value>0 || idproducto.value!=null){
      const prod = this.productos.find(p => p.id === idproducto.value);
      // const sub = cantidad.value * parseFloat(prod.precio);
      // const valor_iva = sub * (parseFloat(iva.value)/100 );
      // const val = (sub)+(valor_iva);
      valor.reset(prod.precio);
    }else{
      valor.reset('');
    }
    this.obtenerResultados();
  }
  obtenerResultados(){
    this.valor_subtotal = 0.00;
    this.valor_iva12 = 0.00;
    this.valor_total = 0.00;
    this.valor_descuento = 0.00;
    const subtotal = this.validateForm.get('valorsubtotal');
    const total = this.validateForm.get('valortotal');
    const iva12 = this.validateForm.get('valoriva');
    const desc = this.validateForm.get('descuento');
    const vdesc = this.validateForm.get('valordescuento');
    Object.values(this.detalles.controls).forEach(control => {
      const v: number = parseFloat(control.value.valorunitario);
      const c: number = control.value.cantidad;
      if (control.value.producto_id > 0 || control.value.producto_id != null){
        if(control.value.iva === 12){
          this.valor_iva12 = this.redondearValores(this.valor_iva12 + ( (v*c) * (control.value.iva/100) ));
        }
        this.valor_subtotal = this.redondearValores(this.valor_subtotal + (v * c));
      }
    });
    if(desc.value >0){
      this.valor_descuento = this.valor_subtotal * this.redondearValores((desc.value /100)) ;
    }
    this.valor_total = this.redondearValores(this.valor_subtotal- this.valor_descuento + this.valor_iva12);
    subtotal.reset(this.redondearValores(this.valor_subtotal));
    vdesc.reset(this.redondearValores(this.valor_descuento));
    iva12.reset(this.redondearValores(this.valor_iva12));
    total.reset(this.redondearValores(this.valor_total));
  }

  redondearValores(numero: number): number{
    const numeroRegexp = new RegExp('\\d\\.(\\d){' + 2 + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
    if (numero > 0) {
      if (numeroRegexp.test('' + numero)) { // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
        return Number(numero.toFixed(2));
      } else {
        // tslint:disable-next-line: max-line-length
        return Number(numero.toFixed(2)) === 0 ? 0 : Number(numero.toFixed(2));  // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
      }
    }else{
      return 0.00;
    }
  }
  descargar(){
    this.cargando = true;
    this.cotiSrv.generarPdf(this.cotizacion.id).subscribe( res => {
      this.cargando = false;
      this.configDescarga(res);
    }, err => {
      this.cargando = false;
    });
  }
  configDescarga(data){
    if(data){
      const url = window.URL.createObjectURL(data);
      const anchor = document.createElement('a');
      anchor.download = `cotizacion${this.cotizacion.secuencia}.pdf`;
      anchor.href = url;
      anchor.click();
    }
  }
  anular(id){
    this.cotiSrv.anular(id).subscribe( (res: any) => {
      if (res.ok === true) {
          this.notification.create(
            'success', 'Correcto', res.mensaje
          );
          this.route.navigateByUrl('/cotizacion');
        }
    });
  }
}
