export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  status: 'Pendiente' | 'Leido' | 'En curso' | 'Por leer';
  notes?: string;
  coverUrl?: string;
  description?: string;
  skills?: string[];

}
