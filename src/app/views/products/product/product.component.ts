import {Component, Input, OnInit} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  @Input() product: ProductType;

  constructor(private http: HttpClient) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      price: 0,
      description: '',
    }
  }
  public products: ProductType[] = [];

  ngOnInit() {
    this.http.get<ProductType[]>('https://testologia.site/tea')
      .subscribe(data=>{
        this.products = data;
      })
  }

}

