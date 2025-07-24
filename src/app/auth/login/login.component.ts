import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, ) {
    this.loginForm = fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe({
      next:(res:any)=>{
        console.log('login successfully!', res);
      },
      error:(error:any)=>{
        console.log('login error', error);
      },
      complete:()=>{
        console.log('login request completed!');
      }
    })
  }
}
