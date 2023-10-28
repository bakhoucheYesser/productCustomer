import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! :Array<Product>
  constructor() {
    this.products= [
      {
        id:1,
        name:"computer",
        price:6500,
        promotion:true
      },
      {
        id:2,
        name:"Tv",
        price:4521,
        promotion:true
      },
      {
        id:3,
        name:"Smartphone",
        price:9854,
        promotion:false
      },
    ]
  }

  public getAllProducts() : Observable<Product[]>{
    return of(this.products);
  }

  public deleteProduct(id:number): Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id)
    return of(true)
  }

  public updateProduct(product: Product): Observable<boolean> {
    // Simulate the update operation by finding the product by ID and updating it.
    const updatedProduct = this.products.find(p => p.id === product.id);
    if (updatedProduct) {
      updatedProduct.promotion = product.promotion;
    }

    return of(true); // Return success as this is a simulation.
  }
}
