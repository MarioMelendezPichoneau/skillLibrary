import { Component, NgModule } from '@angular/core';
import { Book } from '../model/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  libros: Book[] = [
    { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', genre: 'Novela', status: 'Leido', coverUrl: 'https://url-shortener.me/4EA3', description: 'Una novela clásica de la literatura española.' },
    { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'Novela', status: 'Pendiente', coverUrl: 'https://url-shortener.me/4E9X', description: 'Una obra maestra del realismo mágico.' },
    { id: 3, title: '1984', author: 'George Orwell', genre: 'Ciencia ficción', status: 'En curso', coverUrl: 'https://url-shortener.me/4EA8', description: 'Una novela distópica sobre un futuro totalitario.' },
    { id: 4, title: 'La Odisea', author: 'Homero', genre: 'Épica', status: 'Por leer', coverUrl: 'https://url-shortener.me/4EAB', description: 'Un poema épico griego que narra las aventuras de Odiseo.' },
  ];

  public array = [1, 2, 3, 4, 5];


}
