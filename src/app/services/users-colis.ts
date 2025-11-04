import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UsersColis, CreateUserColisRequest, UpdateUserColisRequest } from '../models/users-colis.model';

@Injectable({
  providedIn: 'root'
})
export class UsersColisService {
  private apiUrl = `${environment.apiUrl}/UsersColis`;

  constructor(private http: HttpClient) { }

  // Récupérer tous les utilisateurs colis
  getAll(): Observable<UsersColis[]> {
    return this.http.get<UsersColis[]>(this.apiUrl);
  }


  // Récupérer un utilisateur colis par ID
  getById(id: number): Observable<UsersColis> {
    return this.http.get<UsersColis>(`${this.apiUrl}/${id}`);
  }

  // Créer un utilisateur colis
  create(user: CreateUserColisRequest): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // Mettre à jour un utilisateur colis
  update(id: number, user: UpdateUserColisRequest): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  // Supprimer un utilisateur colis
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}