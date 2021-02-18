import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal.component';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';
import { EditCotizacionComponent } from '../cotizacion/edit-cotizacion/edit-cotizacion.component';
import { ClienteComponent } from '../cliente/cliente.component';
import { EditClienteComponent } from '../cliente/edit-cliente/edit-cliente.component';
import { ProductosComponent } from '../productos/productos.component';
import { EditProductoComponent } from '../productos/edit-producto/edit-producto.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { EditCategoriaComponent } from '../categoria/edit-categoria/edit-categoria.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      { path: 'cotizacion', component: CotizacionComponent },
      { path: 'cotizacion/:id', component: EditCotizacionComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'cliente/:id', component: EditClienteComponent },
      { path: 'producto', component: ProductosComponent },
      { path: 'producto/:id', component: EditProductoComponent },
      { path: 'categoria', component: CategoriaComponent },
      { path: 'categoria/:id', component: EditCategoriaComponent },
      { path: 'config', component: ConfiguracionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalRoutingModule { }
