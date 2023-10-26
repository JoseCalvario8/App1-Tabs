import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.services';
import { FavoritosService } from '../services/fav.services';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public products : Product[] = [];
  public productsFounds : Product [] = [];
  public productosAgregados: Product[] = [];
  public total: number = 0;

  public filter = [
    "Abarrotes",
    "Frutas y verduras",
    "Limpieza",
    "Farmacia",
  ];

  constructor(private cartService: CartService, private favoritosService: FavoritosService) {
    this.products.push({
      name: "Coca cola",
      photo: "https://picsum.photos/500/300?random",
      price: 20,
      type: "Abarrotes",
      description: "Lorem ipsum dolor sit amet",
    });
    this.products.push({
      name: "Jabon Zote",
      photo: "https://picsum.photos/500/300?random",
      price: 40,
      type: "Limpieza",
      description: "Lorem ipsum dolor sit amet",
    });
    this.products.push({
      name: "Manzana",
      photo: "https://picsum.photos/500/300?random",
      price: 20,
      type: "Frutas y verduras",
      description: "Lorem ipsum dolor sit amet",
    });
    this.products.push({
      name: "Aspirina",
      photo: "https://picsum.photos/500/300?random",
      price: 50,
      type: "Farmacia",
      description: "Lorem ipsum dolor sit amet",
    });

    this.productsFounds = this.products;
  }


  public filterProducts(): void {
    console.log(this.filter);
    if (this.filter.length > 0) {
      this.productsFounds = this.products.filter(
        item => this.filter.includes(item.type)
      );
    } else {
      this.productsFounds = this.products;
    }
  }
  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      this.productosAgregados = cart;
    });
    this.cartService.total$.subscribe((total) => {
      this.total = total; // Actualiza 'total' cuando cambia en el servicio
    });

  }
public agregarProducto(producto: Product): void {
   this.cartService.agregarProducto(producto);
 }
 
public eliminarProducto(producto: Product): void {
  this.cartService.eliminarProducto(producto);
}
agregarAlFavorito(producto: any) {
  this.favoritosService.agregarFavorito(producto);
  }
}