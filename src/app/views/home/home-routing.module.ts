import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AboutProductsComponent} from "./about-products/about-products.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'products/:id', component: AboutProductsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
