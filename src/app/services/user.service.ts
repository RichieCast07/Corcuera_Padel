import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://98.85.25.121/user/';

    constructor(private http: HttpClient) { }

    login(contacto: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { contacto, password });
    }

    register(name: string, lastname: string, contacto: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/register`, { name, lastname, contacto, password });
    }
}
