import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // ⬅️ papildyta Router

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  companyData = history.state.data;

  constructor(private router: Router) {
    console.log('Gauti duomenys:', this.companyData);
  }

  goBack() {
    this.router.navigate(['/companies']); // 👈 pakeisk "/companies" į savo realų maršrutą, jei skiriasi
  }
}
