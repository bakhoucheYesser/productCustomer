import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! :Array<Product>
  errorMessage: string = "no data found";
  constructor(private productservice : ProductService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts(){
    this.productservice.getAllProducts().subscribe({
      next : (data) =>{
        this.products =data;
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    });
  }
  handelDeleteProduct(p: Product) {
    let conf = confirm("are you sure ?");
    if(!conf)return;
    this.productservice.deleteProduct(p.id).subscribe({
      next : (data) => {
         // this.getAllProducts();
        let index = this.products.indexOf(p);
        this.products.splice(index,1)
      }
    })
  }
  handleTogglePromotion(product: Product) {
    product.promotion = !product.promotion;
    this.productservice.updateProduct(product).subscribe({
      next: (data) => {
        // Handle success
      },
      error: (err) => {
        // Handle error
      }
    });
  }

}
