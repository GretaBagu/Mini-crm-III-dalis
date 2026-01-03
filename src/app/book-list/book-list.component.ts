import { Component, OnInit } from '@angular/core';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  filteredBooks: any[] = [];
  loading = true;
  error: string | null = null;

  filterTitle: string = '';
  filterIsbn: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const db = getDatabase();
    const booksRef = ref(db, 'books');

    onValue(booksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.books = Object.entries(data).map(([key, value]: any) => ({
          id: key,
          ...value
        }));
        this.sortBooks();
        this.applyFilters();
      } else {
        this.books = [];
        this.filteredBooks = [];
      }
      this.loading = false;
    }, (error) => {
      this.error = 'Nepavyko gauti knygų: ' + error.message;
      this.loading = false;
    });
  }

  sortBooks(): void {
    this.books.sort((a, b) => a.title.localeCompare(b.title));
  }

  applyFilters(): void {
    this.filteredBooks = this.books.filter(book => {
      const titleMatch = this.filterTitle
        ? book.title?.toLowerCase().includes(this.filterTitle.toLowerCase())
        : true;

      const isbnMatch = this.filterIsbn
        ? book.isbn?.toLowerCase().includes(this.filterIsbn.toLowerCase())
        : true;

      return titleMatch && isbnMatch;
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  navigateToForm(): void {
    this.router.navigate(['/form']);
  }

  editBook(book: any): void {
    this.router.navigate(['/form'], { state: { data: book } });
  }

  deleteBook(bookId: string): void {
    if (confirm('Ar tikrai norite ištrinti šią knygą?')) {
      const db = getDatabase();
      const bookRef = ref(db, 'books/' + bookId);
      remove(bookRef)
        .then(() => alert('✅ Knyga ištrinta sėkmingai.'))
        .catch(err => alert('❌ Klaida trinant knygą: ' + err.message));
    }
  }
}
