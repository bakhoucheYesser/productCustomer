import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! :Array<Product>;
  currentPage : number = 0 ;
  pageSize : number = 5;
  totalPages: number = 0;

  errorMessage: string = "no data found";
  searchFormGroup! : FormGroup;
  currentAction : string = "all";
  constructor(private productservice : ProductService ,private fb : FormBuilder , public authService : AuthenticationService , private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null)
    });
    this.handelGetPageProducts();
  }

  handelGetPageProducts(){
    this.productservice.getPageProducts(this.currentPage ,this.pageSize).subscribe({
      next : (data) =>{
        this.products =data.products;
        this.totalPages= data.totalPages;
      },
      error : (err)=>{
        this.errorMessage=err;
      }
    });
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

  handelSearchProduct() {
    this.currentAction = "search";
    this.currentPage = 0;
    let keyword = this.searchFormGroup.value.keyword;
    this.productservice.searchProduct(keyword ,this.currentPage , this.pageSize).subscribe({
      next : (data) => {
        this.products =data.products;
        this.totalPages = data.totalPages;
      }
    })

  }

  gotoPage(i: number) {
    this.currentPage = i;
    if (this.currentAction ==="all")
    this.handelGetPageProducts();
    else
      this.handelSearchProduct();
  }

  handelNewProduct() {
    this.router.navigateByUrl("/admin/newProduct");
  }
}
