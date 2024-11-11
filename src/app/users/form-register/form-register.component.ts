import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  name: string = '';
  lastname: string = '';
  contacto: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  saveData() {
    if (!this.name || !this.lastname || !this.contacto || !this.password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    this.userService.register(this.name, this.lastname, this.contacto, this.password).subscribe(
      response => {
        alert('Registro exitoso!');
        this.router.navigate(['/couples']);
      },
      error => {
        console.error('Error de registro:', error);
        alert('Hubo un error en el registro.');
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
