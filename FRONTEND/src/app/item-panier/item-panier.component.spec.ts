import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPanierComponent } from './item-panier.component';

describe('ItemPanierComponent', () => {
  let component: ItemPanierComponent;
  let fixture: ComponentFixture<ItemPanierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemPanierComponent]
    });
    fixture = TestBed.createComponent(ItemPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
