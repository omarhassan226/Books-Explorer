import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        Swal.fire({
          title: 'Success!',
          text: 'You have logged in successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        this.loginForm.reset();
        this.router.navigate(['/books/show']);
        console.log('login successfully!', res);
      },
      error: (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: 'Login failed. Please check your credentials.',
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
        this.loginForm.reset();
        console.log('login error', error);
      },
      complete: () => {
        console.log('login request completed!');
      },
    });
  }
}
