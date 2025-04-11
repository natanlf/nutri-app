import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsComponent } from './foods/foods.component';
import { FoodsRoutingModule } from './foods-routing.module';
import { AngularMaterialModule } from '../core/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FoodsComponent
  ],
  imports: [
    FoodsRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class FoodModule { }
