import { Component, Input } from '@angular/core';
import { Food } from '../../../core/models/food';

@Component({
  selector: 'app-meal',
  standalone: false,
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css'
})
export class MealComponent {

  @Input() foods!: Food[];
  foodsInEachMeal: any[] = [];
  meal!: string;

  addFood() {
    this.foodsInEachMeal.push({id: new Date().getTime()});
  }

  onSelectedFood(selectedFood: Food) {
    console.log(selectedFood);
  }

}
