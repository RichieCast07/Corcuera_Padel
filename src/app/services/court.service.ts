import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Court } from '../interfaces/courts';

@Injectable({
    providedIn: 'root'
})
export class CourtService {
    private apiUrl = 'http://98.85.25.121/court/';

    constructor(private http: HttpClient) { }

    getCourts(): Observable<Court[]> {
        return this.http.get<Court[]>(this.apiUrl + 'obtener');
    }

    addCourt(court: Court): Observable<Court> {
        return this.http.post<Court>(this.apiUrl + 'agregar', court);
    }

    updateCourt(id: number, court: Court): Observable<Court> {
        return this.http.put<Court>(`${this.apiUrl}editar/${id}`, court);
    }

    deleteCourt(id: number): Observable<Court> {
        return this.http.delete<Court>(`${this.apiUrl}eliminar/${id}`);
    }
}
