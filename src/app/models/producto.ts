import { Model } from './model';
import { Categoria } from './categoria';
export class Producto extends Model {
  constructor() {
    super();
    this.precio = '0';
  }
  nombre: string;
  // tslint:disable-next-line: variable-name
  categoria_id: number;
  categoria?: Categoria;
  precio: string;
}
