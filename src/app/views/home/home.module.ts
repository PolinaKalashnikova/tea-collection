import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {AboutProductsComponent} from "./about-products/about-products.component";
import {MainComponent} from "./main/main.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AboutProductsComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    RouterModule
  ],
  exports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
