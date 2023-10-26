import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
    public products : Product[] = [];
    public productsFounds : Product [] = [];
    public productosAgregados: Product[] = [];
    public total: number = 0;
    private cartSubject = new BehaviorSubject<Product[]>(this.productosAgregados);
    private totalSubject = new BehaviorSubject<number>(0); // BehaviorSubject para 'total'
    public total$ = this.totalSubject.asObservable(); // Observable para 'total'

  getCart() {
    return this.cartSubject.asObservable();
    
  }

  public agregarProducto(producto: Product): void {
    // Verificar si el producto ya está en la lista de productos agregados
    const productoExistente = this.productosAgregados.find(p => p.name === producto.name);
  if (productoExistente) {
    // Verificar si la propiedad cantidad existe en el productoExistente
    if (productoExistente.cantidad) {
      // Si existe, incrementar su valor
      productoExistente.cantidad += 1;
      productoExistente.price += producto.price;
    } else {
      // Si no existe, inicializarla con un valor de 1
      productoExistente.cantidad = 1;
    }
  } else {
      // Si el producto no existe, agregarlo a la lista con una cantidad inicial de 1
      this.productosAgregados.push({ ...producto, cantidad: 1 });
    }
    this.total += producto.price;
    this.totalSubject.next(this.total);
    console.log(this.productosAgregados);
 }
 
public eliminarProducto(producto: Product): void {
  // Buscar el índice del producto en el arreglo productosAgregados
  const index = this.productosAgregados.findIndex(p => p.name === producto.name);

  // Verificar si se encontró el producto en el arreglo
  if (index !== -1) {
    // Obtener el producto eliminado
    const productoEliminado = this.productosAgregados[index];

    // Verificar si se encontró el producto eliminado
    if (productoEliminado) {
      // Eliminar el producto del arreglo productosAgregados
      this.productosAgregados.splice(index, 1);

      // Restar el precio del producto eliminado del total
      this.total -= productoEliminado.price;
      this.totalSubject.next(this.total);
    }
  }
}
calcularTotal() {
    let total = 0;
    for (const producto of this.productosAgregados) {
      total += producto.price * (producto.cantidad || 1); // Usamos producto.cantidad o 1 en caso de que cantidad no esté definida
    }
    this.totalSubject.next(this.total);
  } 
}
