import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // 👈 būtinas dėl *ngIf
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  isLoggedIn(): boolean {
    return this.authService.getCurrentUser() !== null;
  }
}
