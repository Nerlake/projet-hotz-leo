import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { HomeComponent } from './home/home.component';
import { PanierComponent } from './panier/panier.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthGuard } from './services/authgarde.service';

const routes: Routes = [
    {path: '', redirectTo: '/accueil', pathMatch: 'full'},
    {path: 'accueil', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'panier', component: PanierComponent, canActivate: [AuthGuard]},
    {path: 'connexion', component: ConnexionComponent},
    {path: 'inscription', component: InscriptionComponent},
    {path: '**', redirectTo: '/accueil'},

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}