import { Injectable } from '@angular/core';
import { Book } from '../pages/model/book';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private storageKey = 'books';

  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(this.getBooks());
  books$ = this.booksSubject.asObservable();

  constructor() {
    //this.booksSubject = new BehaviorSubject<Book[]>([]);
    if (typeof window !== 'undefined') {

      // Si no hay libros en localStorage, agregamos algunos iniciales

      if (!localStorage.getItem(this.storageKey)) {
        const initialBooks: Book[] = [
          {
            id: 1,
            title: 'El Quijote',
            author: 'Miguel de Cervantes',
            genre: 'Novela',
            status: 'Leido',
            coverUrl: 'https://url-shortener.me/4EA3',
            description: 'Una novela clásica de la literatura española.',
          },
          {
            id: 2,
            title: 'Cien años de soledad',
            author: 'Gabriel García Márquez',
            genre: 'Novela',
            status: 'Pendiente',
            coverUrl: 'https://url-shortener.me/4E9X',
            description: 'Una obra maestra del realismo mágico.',
          },
          {
            id: 3,
            title: '1984',
            author: 'George Orwell',
            genre: 'Ciencia ficción',
            status: 'En curso',
            coverUrl: 'https://url-shortener.me/4EA8',
            description: 'Una novela distópica sobre un futuro totalitario.',
          },
          {
            id: 4,
            title: 'La Odisea',
            author: 'Homero',
            genre: 'Épica',
            status: 'Por leer',
            coverUrl: 'https://url-shortener.me/4EAB',
            description:'Un poema épico griego que narra las aventuras de Odiseo.',
            notes: 'Un clásico que todo el mundo debería leer al menos una vez.'
          },
        ];

        localStorage.setItem(this.storageKey, JSON.stringify(initialBooks));
      }
    }

    // Emitir los libros iniciales
    this.booksSubject.next(this.getBooks());
  }

  // Get all books from local storage
  getBooks(): Book[] {
    if (typeof window === 'undefined') return []; // Evita errores en Node
    const books = localStorage.getItem(this.storageKey);
    return books ? JSON.parse(books) : [];
  }

  // Get a book by its ID
  getBookById(id: number): Book | undefined {
    return this.getBooks().find((book) => book.id === id);
  }

  // save books to local storage
  saveBooks(books: Book[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(books));
  }

  // Add a new book to local storage
  addBook(book: Book): void {
    const books = this.getBooks();
    book.id = books.length > 0 ? books[books.length - 1].id + 1 : 1; // Auto-increment ID
    books.unshift(book); // Add to the beginning of the array
    //books.push(book);
    this.saveBooks(books);
  }

  // Update an existing book in local storage
  updateBook(updatedBook: Book): void {
    const books = this.getBooks().map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    );
    this.saveBooks(books);
  }

  // Delete a book from local storage by its ID
  deleteBook(id: number): void {
    const books = this.getBooks().filter((book) => book.id !== id);
    this.saveBooks(books);
  }
}
