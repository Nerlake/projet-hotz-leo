import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AjouterUtilisateur, SupprimerUtilisateur } from '../ngxs/states/user.state';
import { Utilisateur } from '../models/utilisateur.model';
import { Router } from '@angular/router';
import { ViderPanier } from '../ngxs/states/panier.state';


@Injectable({
  providedIn: 'root'
})

export class ConnexionService {

    constructor(private httpClient: HttpClient, private store: Store, private router: Router) { }


    url : string = "https://tp-angular-backend-hotz-leo.onrender.com/api/utilisateur/login"; 

    private errorMessage = new BehaviorSubject<string>('');
    errorMessageObservable = this.errorMessage.asObservable();


    connexion(login: string, password: string): Observable<void> {
        return new Observable<void>(observer => {
          this.httpClient.post<Utilisateur>(this.url, {login: login, password: password}).subscribe(
            (response) => {
              console.log(response);
              this.store.dispatch(new AjouterUtilisateur(response));
              observer.next(); 
              observer.complete();
            },
            (error) => {
              var message = error.error.message;
              if(message == "" || message == null){
                this.errorMessage.next("Impossible de se connecter au serveur API");
              }
              else{
                this.errorMessage.next(message);
              }
              observer.error(error); 
            }
          );
        });
      }

    deconnexion() : void{
      this.store.dispatch(new SupprimerUtilisateur())
      this.store.dispatch(new ViderPanier());
      this.router.navigate(['/connexion']);
      console.log("deconnexion service");
    }
}