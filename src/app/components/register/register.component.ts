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
    if (!this.name || !this.lastname || !this.contacto || !this.password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const newUser = {
      name: this.name,
      lastname: this.lastname,
      contacto: this.contacto,
      password: this.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registro exitoso!');
    this.router.navigate(['/couples']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}