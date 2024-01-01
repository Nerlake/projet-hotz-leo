import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { ProduitComponent } from './produit/produit.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PanierComponent } from './panier/panier.component';
import { ItemPanierComponent } from './item-panier/item-panier.component';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from './ngxs/states/panier.state';
import { ConnexionComponent } from './connexion/connexion.component';
import { UserState } from './ngxs/states/user.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { InscriptionComponent } from './inscription/inscription.component';
import { HeroComponent } from './hero/hero.component';
import {NgxTypedJsModule} from 'ngx-typed-js';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchbarComponent,
    ListeProduitsComponent,
    ProduitComponent,
    HomeComponent,
    PanierComponent,
    ItemPanierComponent,
    ConnexionComponent,
    InscriptionComponent,
    HeroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([PanierState, UserState]),
    BrowserAnimationsModule,
    MatMenuModule,
    NgxTypedJsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
