import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        // After successful registration, user is automatically logged in
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        // Handle Firebase auth errors
        if (err.code) {
          switch (err.code) {
            case 'auth/email-already-in-use':
              this.error = 'Cet email est déjà utilisé';
              break;
            case 'auth/weak-password':
              this.error = 'Le mot de passe doit contenir au moins 6 caractères';
              break;
            case 'auth/invalid-email':
              this.error = 'Email invalide';
              break;
            default:
              this.error = 'Erreur lors de l\'inscription. Veuillez réessayer';
          }
        } else {
          this.error = err.message || 'Registration failed';
        }
      }
    });
  }
}
