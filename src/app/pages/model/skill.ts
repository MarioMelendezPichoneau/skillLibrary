export interface Skill {
  id: number;
  name: string;
  category: 'Programación' | 'Diseño' | 'Marketing' | 'Idiomas' | 'Comunicacion' | 'Gestión de Proyectos' | 'Desarrollo Personal' | 'Finanzas'|'Otros';
  goal?: string;
  progress: number;
  status: 'Pendiente' | 'Finalizada' | 'En progreso' | 'Por empezar';
  description?: string;
  books?: string[];
}