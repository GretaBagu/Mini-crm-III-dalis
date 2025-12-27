import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { email, password } = this.registerForm.value;

    this.authService.register(email, password)
      .then(() => {
        this.successMessage = 'Registracija sėkminga! Dabar galite prisijungti.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      })
      .catch(error => {
        this.errorMessage = this.mapError(error.code);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  mapError(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El. paštas jau naudojamas';
      case 'auth/invalid-email':
        return 'Neteisingas el. paštas';
      case 'auth/weak-password':
        return 'Slaptažodis per silpnas';
      default:
        return 'Įvyko klaida. Bandykite dar kartą.';
    }
  }
}
