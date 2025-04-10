import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsComponent } from './foods/foods.component';
import { FoodsRoutingModule } from './foods-routing.module';



@NgModule({
  declarations: [
    FoodsComponent
  ],
  imports: [
    FoodsRoutingModule,
    CommonModule
  ]
})
export class FoodModule { }
