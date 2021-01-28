import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  searchValue = '';
  visible = false;
  cargando = true;
  productos: Producto[] = [];
  listOfDisplayData = [];
  constructor(private prodSrv: ProductoService, private route: Router, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.prodSrv.listar().subscribe(res => {
      this.cargando = false;
      if (res.ok === true) {
        this.productos.push(...res.productos);
        this.listOfDisplayData = [... this.productos];
      }
    }, err => {
      this.cargando = false;
    });
  }
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.productos.filter((producto: Producto) => {
      const nombreCliente = producto.nombre.toLowerCase();
      const busqueda = this.searchValue.toLowerCase();
      return nombreCliente.indexOf(busqueda) !== -1;
    });
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  edit(id: number): void {
    this.route.navigateByUrl('main/producto/' + id);
  }
  nuevo(): void {
    this.route.navigateByUrl('main/producto/nuevo');
  }
  eliminar(id): void {
    this.prodSrv.eliminar(id).subscribe(res => {
      if (res.ok === true) {
        this.notification.create(
          'success', 'Correcto', res.mensaje
        );
        this.listOfDisplayData = this.listOfDisplayData.filter(d => d.id !== id);
      }
    }, err => { });
  }
}
