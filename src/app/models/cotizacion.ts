import { Model } from './model';
import { Cliente } from './cliente';
export class Cotizacion extends Model {

  constructor() {
    super();
    this.fecha = new Date();
    this.cliente = new Cliente();
  }
  fecha: Date;
  secuencia: string;
  nombre: string;
  anulado: number;
  identificador: string;
  cliente?: Cliente | null;
  valorsubtotal: number;
  descuento: number;
  valordescuento: number;
  valoriva: number
  valortotal: number;
  detalles: Detalle[];
}


class Detalle {
  producto: number;
  cantidad: number;
  descripcion?: string;
  iva: number;
  valorunitario: number;
}
