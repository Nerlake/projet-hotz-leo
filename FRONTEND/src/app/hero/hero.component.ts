import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { UserState } from '../ngxs/states/user.state';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @Select(UserState.getPrenom) prenom$!: Observable<string>;

  prenom: string = '';

  ngOnInit() {
    this.prenom$.subscribe(user => {
      console.log(user);
      this.prenom = user || '';  
    });
  }
  
}
