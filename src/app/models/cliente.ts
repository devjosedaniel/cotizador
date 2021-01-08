import { Model } from './model';

export class Cliente extends Model {
  nombre: string;
  direccion: string;
  telefono: string;
  identificador: string;
  email: string;
  // estado: number | boolean;
}

