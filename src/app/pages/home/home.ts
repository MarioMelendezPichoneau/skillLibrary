import { Books } from './../books/books';
import { Component, inject, NgModule } from '@angular/core';
import { Book } from '../model/book';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book-service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { Skill } from '../model/skill';
import { SkillService } from '../../services/SkillService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  libros: Book[] = [];
  librosFiltrados: Book[] = [];

  habilidades: Skill[] = [];
  filtroTitulo: string = '';

  private sub!:Subscription;

  private Bookservices = inject(BookService);
  private Skillservices = inject(SkillService);

  ngOnInit() {

    this.sub = this.Bookservices.books$.subscribe((books: Book[]) => {
      this.libros = books;
      this.librosFiltrados = books.slice(0, 8);
    });
   // this.libros = this.Bookservices.getBooks();
    this.habilidades = this.Skillservices.getSkills();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  filtrarLibros() {
  const texto = this.filtroTitulo.toLowerCase();
  this.librosFiltrados = this.libros
    .filter(libro => libro.title.toLowerCase().includes(texto))
    .slice(0, 8);
}

  /*libros: Book[] = [
    { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes', genre: 'Novela', status: 'Leido', coverUrl: 'https://url-shortener.me/4EA3', description: 'Una novela clásica de la literatura española.' },
    { id: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', genre: 'Novela', status: 'Pendiente', coverUrl: 'https://url-shortener.me/4E9X', description: 'Una obra maestra del realismo mágico.' },
    { id: 3, title: '1984', author: 'George Orwell', genre: 'Ciencia ficción', status: 'En curso', coverUrl: 'https://url-shortener.me/4EA8', description: 'Una novela distópica sobre un futuro totalitario.' },
    { id: 4, title: 'La Odisea', author: 'Homero', genre: 'Épica', status: 'Por leer', coverUrl: 'https://url-shortener.me/4EAB', description: 'Un poema épico griego que narra las aventuras de Odiseo.' },
  ]; */

  public array = [1, 2, 3, 4, 5];


}
