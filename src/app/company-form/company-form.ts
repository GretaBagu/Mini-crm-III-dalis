import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { getDatabase, ref, push, set } from 'firebase/database';


import '../firebase.config';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './company-form.html',
  styleUrls: ['./company-form.css']
})
export class CompanyFormComponent {
  form: FormGroup;
  showContactForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      companyName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]],
      companyCode: ['', [
        Validators.pattern('^[0-9]*$')
      ]],
      vatCode: ['', [
        Validators.pattern('^(LT)?[0-9]+$')
      ]],
      address: [''],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.pattern('^\\+370\\d{7,9}$')
      ]],
      contacts: this.fb.array([]) // FormArray kontaktams
    });
  }

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  toggleContactForm(): void {
    this.showContactForm = !this.showContactForm;

    if (this.showContactForm && this.contacts.length === 0) {
      this.addContact();
    }
  }

  addContact(): void {
    const contactGroup = this.fb.group({
      contactName: [''],
      contactSurname: [''],
      contactPosition: [''],
      contactPhone: ['']
    });

    this.contacts.push(contactGroup);
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  submit(): void {
    console.log('Registracijos bandymas');

    if (this.form.valid) {
      const formData = JSON.parse(JSON.stringify(this.form.getRawValue()));
      formData.contacts = this.contacts.controls.map(contact => contact.value);

      console.log('Galutiniai duomenys:', formData);

      const db = getDatabase();
      const companiesRef = ref(db, 'companies');
      const newCompanyRef = push(companiesRef);

      set(newCompanyRef, formData)
        .then(() => {
          alert('Duomenys išsaugoti į Firebase');

          this.router.navigate(['/confirmation'], {
            state: { data: formData }
          });
        })
        .catch((error) => {
          console.error('Klaida išsaugant:', error);
          alert('Nepavyko išsaugoti duomenų į serverį');
        });

    } else {
      console.warn('Forma neteisinga');
      this.form.markAllAsTouched();
    }
  }
}
