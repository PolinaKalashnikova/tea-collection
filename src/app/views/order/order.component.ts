import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../shared/services/products.service";

@Component({
  selector: 'order-component',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  productTitle = '';
  isSuccess = true;

  // если не заполнено, на кнопку нельзя нажать, эта переменная не пригодится
  isError = false;

  loader = false;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private productsService: ProductsService,
              private router: Router) {
  }

  infoForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required, Validators.pattern('^[а-яёА-ЯЁ]+$')]],
    phone: ['', [Validators.required, Validators.pattern('^[\+]*[0-9]{11}$')]],
    country: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    product: [{value: '', disabled: true}, Validators.required],
    address: ['', [Validators.required, Validators.pattern('^[а-яёА-ЯЁ 0-9-\/]+$')]],
    comment: '',
  });

  ngOnInit() {
    this.loader = true;
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      if (queryParams) {
        this.productTitle = queryParams['product'];
        console.log(this.productTitle);
        this.loader = false;
        this.infoForm.get('product')?.setValue(this.productTitle);
      }
    });

    this.infoForm!.get('name')!.valueChanges.subscribe((val) => {
      console.log(val);
      if (val && /[\d]/.test(val)) {
        this.infoForm!.get('name')!.setValue(val.replaceAll(/[\d]/g, ''));
      }
    });

  }

  createOrder(button: HTMLButtonElement) {
    button.setAttribute('disabled', 'disabled');
    // console.log(button);
    this.productsService.createOrder(this.infoForm.getRawValue())
      .subscribe({
        next: (data) => {
          if (data.success && !data.message) {
            this.isSuccess = false;
            button.removeAttribute('disabled');
            // console.log(button);
            console.log('YEEES');
          } else {
            this.isError = true;
            setTimeout(() => {
              this.isError = false;
            }, 3000);
            button.removeAttribute('disabled');
            console.log('NOO');
          }
        },
        error: (error) => {
          this.router.navigate(['/']);
        }
      })
  }
}



// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormGroup} from "@angular/forms";
// import {ProductsService} from "../../../services/products.service";
// import {Validators} from "@angular/forms";
// import {ActivatedRoute, Router} from "@angular/router";
//
//
// @Component({
//   selector: 'order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.scss']
// })
//
// export class OrderComponent implements OnInit {
//
//   productTitle = '';
//   isSuccess = true;
//   isError = false;
//
//   constructor(private fb: FormBuilder,
//               private activatedRoute: ActivatedRoute,
//               private productsService: ProductsService,
//               private router: Router) {
//   }
//
//   orderForm: FormGroup = this.fb.group({
//     name: ['', [Validators.required, Validators.pattern('^[А-Яа-я]{2,}$')]],
//     lastName: ['', [Validators.required, Validators.pattern('^[А-Яа-я]{2,}$')]],
//     phone: ['', [Validators.required, Validators.pattern('^[+]?[0-9]{12}$')]],
//     country: ['', [Validators.required, Validators.pattern('^[а-яА-Я]{2,}$')]],
//     zip: ['', [Validators.required, Validators.pattern('^[0-9]{7,}$')]],
//     product: [[{value: '', disabled: true}, Validators.required]],
//     address: ['', [Validators.required, Validators.pattern('^[а-яёА-ЯЁ 0-9-\/]+$')]],
//     comment: ['',],
//   });
//
//
//   get product() {
//     return this.orderForm.get('product');
//   }
//
//   get name() {
//     return this.orderForm.get('name');
//   }
//
//   get lastName() {
//     return this.orderForm.get('lastName');
//   }
//
//   get phone() {
//     return this.orderForm.get('phone');
//   }
//
//   get address() {
//     return this.orderForm.get('address');
//   }
//
//   get country() {
//     return this.orderForm.get('country');
//   }
//
//   get zip() {
//     return this.orderForm.get('zip');
//   }
//
//   ngOnInit() {
//     this.activatedRoute.queryParams.subscribe((queryParams) => {
//       if (queryParams) {
//         this.productTitle = queryParams['product'];
//         console.log(this.productTitle);
//         this.product?.setValue(this.productTitle);
//       }
//     });
//   }
// }
