import { Component, inject } from '@angular/core';
import { Book } from '../model/book';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './books.html',
  styleUrl: './books.css'
})
export class Books {

  Books: Book[] = [];

  bookForm!: FormGroup;
  editbookId: Book | null = null;

  private sub!: Subscription;
  private bookService = inject(BookService);
  private fb = inject(FormBuilder);

  ngOnInit(): void{
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      status: ['', Validators.required],
      notes: [''],
      coverUrl: [''],
      description: [''],
      skills: ['']
    });

    this.sub = this.bookService.books$.subscribe(books => {
      this.Books = books;
    });


  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }


  submitForm(): void {
    if (this.bookForm.invalid) {
      alert('⚠️ Completa todos los campos correctamente');
      this.bookForm.markAllAsTouched();
      return;
    }

    if (this.editbookId) {
      const updatedBook: Book = { ...this.editbookId, ...this.bookForm.value };
      this.bookService.updateBook(updatedBook);
      this.editbookId = null;
    } else {

      this.bookService.addBook(this.bookForm.value);
    }

    this.bookForm.reset({ status: ''  });

  }

  editBook(book: Book): void {
    this.editbookId = book;
    this.bookForm.patchValue(book);
  }

  deleteBook(bookId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.bookService.deleteBook(bookId);
    }
  }


}
