import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { User } from '../model/user';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule

  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {

    if(this.loginForm.invalid) {
      alert('⚠️ Completa todos los campos correctamente');
      return;
    }

    const { email, password } = this.loginForm.value;
    const savedUser = localStorage.getItem('user');

    if(!savedUser) {
      alert('❌ Usuario no encontrado. Por favor, regístrate primero.');
      return;
    }

    const parseUser: User = JSON.parse(savedUser);

     if (!parseUser) {
    alert('❌ La cuenta no existe, regístrate primero.');
    return;
  }

    if(parseUser.email !== email || parseUser.password !== password) {
      alert('❌ Credenciales incorrectas');
      return;
    }


    alert(`✅ Bienvenido ${parseUser.username}!`);
    this.router.navigate(['/dashboard']);
    this.loginForm.reset();

  }

  register(): void {

    if(this.registerForm.invalid) {
      alert('⚠️ Completa todos los campos correctamente');
      return;
    }

    const newUser: User = this.registerForm.value;
    localStorage.setItem('user', JSON.stringify(newUser));
    alert('✅ Registro exitoso! Ahora puedes iniciar sesión.');
    this.registerForm.reset();
    this.router.navigate(['/login']);

    const loginTab = document.getElementById('login-tab');
    loginTab?.click();
  }

}
