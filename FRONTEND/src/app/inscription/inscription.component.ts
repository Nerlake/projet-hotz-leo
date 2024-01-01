import { Component } from '@angular/core';
import { InscriptionService } from '../services/inscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  nom: string = "";
  prenom: string = "";
  login: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";
  error : string = "";

  constructor(private inscriptionService: InscriptionService, private router: Router) { }

  ngOnInit() {
    this.inscriptionService.errorMessageObservable.subscribe(
      (error) => {
        this.error = error;
      }
    );
  }

  inscription(): void {


    if(this.nom == "" || this.prenom == "" || this.login == "" || this.email == "" || this.password == "" || this.password2 == ""){
      this.error = "Veuillez remplir tous les champs";
      return;
    }

    if(this.password != this.password2 || this.password == "" || this.password2 == ""){
      this.error = "Les deux mots de passe ne sont pas identiques";
      return;
    }
    this.inscriptionService.inscription(this.nom, this.prenom, this.login, this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/accueil']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
