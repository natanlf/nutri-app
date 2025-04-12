import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodsComponent } from './foods/foods.component';
import { FoodsRoutingModule } from './foods-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../../core/angular-material/angular-material.module';
import { FoodSearchComponent } from './food-search/food-search.component';
import { MealComponent } from './meal/meal.component';


@NgModule({
  declarations: [
    FoodsComponent,
    FoodSearchComponent,
    MealComponent
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
