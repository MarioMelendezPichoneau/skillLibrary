import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book-service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book } from '../model/book';

@Component({
  selector: 'app-book-detail',
  imports: [
    CommonModule,
    RouterModule,

  ],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css'
})
export class BookDetail {
  book: Book | undefined;
  private route = inject(ActivatedRoute);
  public router = inject(Router);
  private bookService = inject(BookService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.book = this.bookService.getBookById(id);

    if (!this.book) {
      // Evita errores en SSR
      if (typeof window !== 'undefined') {
        window.alert('⚠️ Libro no encontrado');
      }
      this.router.navigate(['/home']);
    }
  }

}
