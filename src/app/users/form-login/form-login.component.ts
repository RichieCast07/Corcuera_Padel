import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {
  contacto: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    console.log('Datos ingresados:', this.contacto, this.password);

    this.userService.login(this.contacto, this.password).subscribe(
      response => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('loggedInUser', JSON.stringify(response.user));
        alert('Inicio de sesión exitoso!');
        this.router.navigate(['/couples']);
      },
      error => {
        console.error('Error de inicio de sesión:', error);
        alert('Usuario o contraseña incorrectos.');
      }
    );
  }
}
