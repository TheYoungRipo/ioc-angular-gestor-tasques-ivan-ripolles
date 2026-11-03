export interface Task {
  id: number;
  titol: string;
  descripcio: string;
  categoria: string;
  data: string;
  hores: number;
  destacada?: boolean;
}
