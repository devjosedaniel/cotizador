import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CotizacionComponent } from './pages/cotizacion/cotizacion.component';
import { ComponentsModule } from './components/components.module';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EditClienteComponent } from './pages/cliente/edit-cliente/edit-cliente.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ConnectionServiceModule } from 'ng-connection-service';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { EditCategoriaComponent } from './pages/categoria/edit-categoria/edit-categoria.component';
import { EditProductoComponent } from './pages/productos/edit-producto/edit-producto.component';
import { EditCotizacionComponent } from './pages/cotizacion/edit-cotizacion/edit-cotizacion.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    CotizacionComponent,
    ClienteComponent,
    EditClienteComponent,
    ProductosComponent,
    CategoriaComponent,
    EditCategoriaComponent,
    EditProductoComponent,
    EditCotizacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    ComponentsModule,
    ConnectionServiceModule
  ],
  exports: [
    ComponentsModule,
    ConnectionServiceModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
