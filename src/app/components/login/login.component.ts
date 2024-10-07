import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  contacto: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    //  Se piden los usuarios existentes de LocalStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Se agregan logs para depurar
    console.log('Datos ingresados:', this.contacto, this.password);
    console.log('Usuarios almacenados:', users);

    // Busca si el usuario existe y coincide la contraseña
    const user = users.find((u: any) =>
      u.contacto.trim() === this.contacto.trim() &&
      u.password.trim() === this.password.trim()
    );

    if (user) {
      // Guarda el usuario autenticado en LocalStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Inicio de sesión exitoso!');
      this.router.navigate(['/couples']);
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  }
}
