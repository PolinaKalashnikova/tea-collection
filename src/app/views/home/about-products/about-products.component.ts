import {Component, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";


@Component({
  selector: 'about-products',
  templateUrl: './about-products.component.html',
  styleUrls: ['./about-products.component.scss']
})
export class AboutProductsComponent implements OnInit, OnDestroy {

  @Input() product: ProductType;

  sub: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {
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
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.http.get<ProductType[]>('https://testologia.site/tea')
          .subscribe(data => {
            this.products = data;
            let product: ProductType | undefined = this.products.find(item => (item.id === +params['id']));
            if (product) {
              this.product = product;
              console.log(this.product)
            }
          })
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

