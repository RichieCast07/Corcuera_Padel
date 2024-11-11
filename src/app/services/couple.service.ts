import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoupleService {

    private apiUrl = 'http://localhost:3000/couple/';

    constructor(private http: HttpClient) { }

    getCouples(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + 'obtener');
    }

    addCouple(couple: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'agregar', couple);
    }

    updateCouple(id: number, couple: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}editar/${id}`, couple);
    }

    deleteCouple(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}eliminar/${id}`);
    }
}
