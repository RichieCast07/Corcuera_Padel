import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  lastname: string = '';
  contacto: string = '';
  password: string = '';

  constructor(private router: Router) {}

  saveData() {
    // Comprueba si lo campos estan completos
    if (!this.name || !this.lastname || !this.contacto || !this.password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Usuarios del locals
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const newUser = {
      name: this.name,
      lastname: this.lastname,
      contacto: this.contacto,
      password: this.password
    };

    // Añade el nuevo usuario y guarda en LocalStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso!');

    // Redirige a /couples
    this.router.navigate(['/couples']);
  }
}
