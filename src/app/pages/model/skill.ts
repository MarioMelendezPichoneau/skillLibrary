export interface Skill {
  id: number;
  name: string;
  category: string;
  goal?: string;
  progress: number;
  status: 'Pendiente' | 'Finalizada' | 'En progreso' | 'Por empezar';
  description?: string;
  books?: string[];
}