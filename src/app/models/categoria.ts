import { Model } from './model';
import { Producto } from './producto';
export class Categoria extends Model {
  nombre: string;
  productos?: Producto[];
}
