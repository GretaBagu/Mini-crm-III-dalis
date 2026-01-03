import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  bookData: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.bookData = nav?.extras?.state?.['data'] || null;
  }

  goBack() {
    this.router.navigate(['/books']);
  }
}
