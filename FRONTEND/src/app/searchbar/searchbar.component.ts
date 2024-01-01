import { Component } from '@angular/core';
import { SearchService } from '../services/searchbar.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  searchContent: string = '';
  constructor(private searchService: SearchService){}

  onSearchChange(searchValue: string){
    this.searchService.updateSearch(searchValue);
  }
}
