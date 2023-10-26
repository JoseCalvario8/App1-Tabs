import { Component } from '@angular/core';
import { FavoritosService } from '../services/fav.services';
import { CartService } from '../services/cart.services';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  productosFavoritos: any[] = [];

  constructor(private favoritosService: FavoritosService,
    private CartService: CartService) {}

  ionViewWillEnter() {
    this.productosFavoritos = this.favoritosService.obtenerFavoritos();
  }

  eliminarDeFavoritos(producto: any) {
    this.favoritosService.eliminarFavorito(producto);
      this.productosFavoritos = this.favoritosService.obtenerFavoritos();
  }

  agregarAlCarrito(producto: any) {
    this.CartService.agregarProducto(producto);
  }
}