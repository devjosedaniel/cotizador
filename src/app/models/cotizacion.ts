import { Model } from './model';
import { Cliente } from './cliente';
export class Cotizacion extends Model {

  constructor() {
    super();
    this.fecha = new Date();
    this.cliente = new Cliente();
  }
  fecha: Date;
  nombre: string;
  identificador: string;
  cliente?: Cliente;
  detalles: Detalle[];
}


class Detalle {
  producto: number;
  cantidad: number;
  descripcion?: string;
}
