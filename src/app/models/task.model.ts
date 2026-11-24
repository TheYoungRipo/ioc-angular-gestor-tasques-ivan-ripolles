export interface Task {
  id: number;
  titol: string;
  descripcio: string;
  categoria: string;
  estat?: string;
  data: string;
  hores: number;
  destacada?: boolean;
}
