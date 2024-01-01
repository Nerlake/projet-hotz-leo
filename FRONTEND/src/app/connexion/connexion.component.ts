  import { Component } from '@angular/core';
  import { ConnexionService } from '../services/connexion.service';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-connexion',
    templateUrl: './connexion.component.html',
    styleUrls: ['./connexion.component.css']
  })
  export class ConnexionComponent {

    username: string = "";
    password: string = "";
    error : string = "";
    isConnecting : boolean = false;

    constructor(private connexionService: ConnexionService, private router : Router) { }

    ngOnInit() {
      this.connexionService.errorMessageObservable.subscribe(
        (error) => {
          this.error = error;
        }
      );
    }

    connexion(): void {
      this.isConnecting = true;
      this.connexionService.connexion(this.username, this.password).subscribe(
        () => {
          this.router.navigate(['/accueil']);
        },
        (error) => {
          console.log(error);
        }
      );
      this.isConnecting = false;
    }
  }
