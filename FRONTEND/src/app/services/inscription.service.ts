import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AjouterUtilisateur, SupprimerUtilisateur } from '../ngxs/states/user.state';
import { Utilisateur } from '../models/utilisateur.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class InscriptionService {

    constructor(private httpClient: HttpClient, private store: Store, private router: Router) { }


    url : string = "https://tp-angular-backend-hotz-leo.onrender.com/api/utilisateur/register"; 

    private errorMessage = new BehaviorSubject<string>('');
    errorMessageObservable = this.errorMessage.asObservable();


    inscription(nom : string, prenom: string, login: string, email: string, password: string): Observable<void> {
        return new Observable<void>(observer => {
          this.httpClient.post<Utilisateur>(this.url, {nom: nom, prenom: prenom, login: login, email: email, password: password}).subscribe(
            (response) => {
              console.log(response);
              this.store.dispatch(new AjouterUtilisateur(response));
              observer.next(); 
              observer.complete();
            },
            (error) => {
              var message = error.error.message;
              this.errorMessage.next(message);
              observer.error(error); 
            }
          );
        });
      }
}