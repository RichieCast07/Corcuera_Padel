import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameFormation } from '../interfaces/game-formation';

@Injectable({
    providedIn: 'root'
})
export class GameFormationService {
    private apiUrl = 'http://localhost:3000/gameformation/';

    constructor(private http: HttpClient) { }

    getFormations(): Observable<GameFormation[]> {
        return this.http.get<GameFormation[]>(this.apiUrl + 'obtener');
    }

    addFormation(formation: GameFormation): Observable<GameFormation> {
        return this.http.post<GameFormation>(this.apiUrl + 'agregar', formation);
    }

    updateFormation(id: number, formation: GameFormation): Observable<GameFormation> {
        return this.http.put<GameFormation>(`${this.apiUrl}editar/${id}`, formation);
    }

    deleteFormation(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}eliminar/${id}`);
    }
}
