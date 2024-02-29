import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  constructor(private http: HttpClient) {

  }

  public products: ProductType[] = [];
  //
  ngOnInit() {
    this.http.get<ProductType[]>('https://testologia.site/tea')
      .subscribe(data=>{
        this.products = data;
      })
  }
}

