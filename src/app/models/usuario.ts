import { Model } from './model';
export class Usuario extends Model {
  usuario?: string;
  recuerdame?: boolean;
  email: string;
  password: string;
}
