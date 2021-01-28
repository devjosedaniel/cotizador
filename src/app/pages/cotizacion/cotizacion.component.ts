import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CotizacionService } from '../../services/cotizacion.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Cotizacion } from '../../models/cotizacion';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  searchValue = '';
  visible = false;
  cargando = true;
  cotizaciones: Cotizacion[] = [];
  listOfDisplayData = [];
  constructor(private cotiz: CotizacionService, private route: Router, private notification: NzNotificationService) {


  }

  ngOnInit(): void {
    this.cotiz.listar().subscribe(res => {
      this.cargando = false;
      if (res.ok === true) {
        this.cotizaciones.push(...res.cotizaciones);
        this.listOfDisplayData = [... this.cotizaciones];
      }
    }, err => {
      this.cargando = false;
    });
  }

  edit(id: number): void {
    this.route.navigateByUrl('main/cotizacion/' + id);
  }
  nuevo(): void {
    this.route.navigateByUrl('main/cotizacion/nuevo');
  }
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.cotizaciones.filter((producto: Cotizacion) => {
      const nombreCliente = producto.nombre.toLowerCase();
      const busqueda = this.searchValue.toLowerCase();
      return nombreCliente.indexOf(busqueda) !== -1;
    });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  eliminar(id): void {
    this.cotiz.eliminar(id).subscribe(res => {
      if (res.ok === true) {
        this.notification.create(
          'success', 'Correcto', res.mensaje
        );
        this.listOfDisplayData = this.listOfDisplayData.filter(d => d.id !== id);
      }
    }, err => { });
  }
}
