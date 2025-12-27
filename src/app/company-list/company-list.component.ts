import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDatabase, ref, onValue } from 'firebase/database';

//import { NavbarComponent } from '../navbar/navbar.component';
import { CompanyFormComponent } from '../company-form/company-form';

import '../firebase.config';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [
    CommonModule,
    CompanyFormComponent
  ],
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const db = getDatabase();
    const companiesRef = ref(db, 'companies');

    onValue(
      companiesRef,
      (snapshot) => {
        const data = snapshot.val();

        this.ngZone.run(() => {
          this.loading = false;

          if (data) {
            this.companies = Object.values(data);
          } else {
            this.companies = [];
          }
        });
      },
      (error) => {
        this.ngZone.run(() => {
          this.loading = false;
          this.error = 'Nepavyko užkrauti duomenų iš Firebase';
          console.error('Krovimo klaida:', error);
        });
      }
    );
  }
}
