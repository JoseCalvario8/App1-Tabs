import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.services'; // Importa el servicio
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public productosAgregados: Product[] = [];  
  public total: number = 0; // Total se calculará en tiempo real

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      this.productosAgregados = cart;
    });
    this.cartService.total$.subscribe((total) => {
      this.total = total; // Actualiza 'total' cuando cambia en el servicio
    });

  }
  eliminarProducto(producto: Product): void {
    this.cartService.eliminarProducto(producto); // Usa el servicio para eliminar del carrito
  }
  /*calcularTotal(): void{
    this.cartService.calcularTotal();
  }*/
}
