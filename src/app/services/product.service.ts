import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products! :Array<Product>
  constructor() {
    this.products= [
      {
        id:UUID.UUID(),
        name:"computer",
        price:6500,
        promotion:true
      },
      {
        id:UUID.UUID(),
        name:"Tv",
        price:4521,
        promotion:true
      },
      {
        id:UUID.UUID(),
        name:"Smartphone",
        price:9854,
        promotion:false
      },
    ];
    for (let i = 0 ; i<10 ; i++){
      this.products.push({ id:UUID.UUID(),
        name:"computer",
        price:6500,
        promotion:true});
      this.products.push({id:UUID.UUID(),
        name:"Tv",
        price:4521,
        promotion:true});
      this.products.push({
        id:UUID.UUID(),
        name:"Smartphone",
        price:9854,
        promotion:false
      })
    }
  }

  public getAllProducts() : Observable<Product[]>{
    return of(this.products);
  }

  public deleteProduct(id:string): Observable<boolean>{
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

  public searchProduct(keyword : string , page: number , size :number): Observable<PageProduct>{
    let result = this.products.filter(p =>p.name.includes(keyword));
    let index = page*size;
    let totalPages = ~~(result.length / size);
    if(this.products.length % size !=0)
      totalPages++;
    let pageProducts = result.slice(index,index + size);
    return of({page :page , size:size , totalPages :totalPages , products:pageProducts});
  }

  public getPageProducts(page: number, size : number ) : Observable<PageProduct>{
    let index = page*size;
    let totalPages = ~~(this.products.length / size);
    if(this.products.length % size !=0)
      totalPages++;
    let pageProducts =this.products.slice(index,index + size);
    return of({page :page , size:size , totalPages :totalPages , products:pageProducts});
  }


  public addNewProduct(product : Product) : Observable<Product>{
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }
}
