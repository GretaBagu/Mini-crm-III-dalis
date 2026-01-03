import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { getDatabase, ref, push, set, get } from 'firebase/database';

import '../firebase.config';

@Component({
  selector: 'app-book-form',
  standalone: true,
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class BookFormComponent {
  form: FormGroup;
  showAuthors = false;
  editing = false;
  bookId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      pages: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      isbn: ['', Validators.required],
      short_description: [''],
      authors: this.fb.array([])
    });

    const stateData = this.router.getCurrentNavigation()?.extras?.state?.['data'];
    if (stateData) {
      this.editing = true;
      this.bookId = stateData.id;
      this.populateForm(stateData);
    }
  }

  // ===== Authors FormArray =====
  get authors(): FormArray {
    return this.form.get('authors') as FormArray;
  }

  toggleAuthors(): void {
    this.showAuthors = !this.showAuthors;

    if (this.showAuthors && this.authors.length === 0) {
      this.addAuthor();
    }
  }

  addAuthor(): void {
    this.authors.push(
      this.fb.group({
        name: [''],
        surname: ['']
      })
    );
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  populateForm(data: any): void {
    this.form.patchValue({
      title: data.title,
      pages: data.pages,
      isbn: data.isbn,
      short_description: data.short_description || ''
    });

    if (data.authors && data.authors.length > 0) {
      this.showAuthors = true;
      data.authors.forEach((author: any) => {
        this.authors.push(
          this.fb.group({
            name: [author.name],
            surname: [author.surname]
          })
        );
      });
    }
  }

  // ===== Submit =====
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.getRawValue();
    const db = getDatabase();
    const booksRef = ref(db, 'books');

    if (this.editing && this.bookId) {
      // Redagavimas – atnaujinam esamą įrašą
      const bookRef = ref(db, `books/${this.bookId}`);
      set(bookRef, formData)
        .then(() => {
          alert('✅ Knyga sėkmingai atnaujinta!');
          this.router.navigate(['/confirmation'], {
            state: { data: formData }
          });
        })
        .catch(error => {
          console.error('Klaida atnaujinant:', error);
          alert('❌ Nepavyko atnaujinti duomenų.');
        });
    } else {
      // Nauja knyga – tikrinam ISBN
      get(booksRef).then(snapshot => {
        const books = snapshot.val();
        const isbnExists =
          books &&
          Object.values(books).some(
            (book: any) => book.isbn === formData.isbn
          );

        if (isbnExists) {
          alert('⚠️ Knyga su tokiu ISBN jau egzistuoja!');
          return;
        }

        const newBookRef = push(booksRef);
        set(newBookRef, formData)
          .then(() => {
            alert('✅ Knyga sėkmingai išsaugota!');
            this.router.navigate(['/confirmation'], {
              state: { data: formData }
            });
          })
          .catch(error => {
            console.error('Klaida išsaugant:', error);
            alert('❌ Nepavyko išsaugoti duomenų.');
          });
      });
    }
  }
}
