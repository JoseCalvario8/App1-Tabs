import { Component } from '@angular/core';
import { Product } from '../models/product.model';

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

  constructor() {
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
    }
  }
}
}