import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroup! : FormGroup;
  constructor( private fb : FormBuilder , private prodService : ProductService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name : this.fb.control( null, [Validators.required , Validators.minLength(4)]),
      price : this.fb.control( null, [Validators.required ]),
      promotion : this.fb.control( false, [Validators.required ]),
    });
  }

  handelAddProduct() {
    let product = this.productFormGroup.value;
    this.prodService.addNewProduct(product).subscribe({
      next: (data)=>{

      },error : err => {

      }
    })
  }
}
