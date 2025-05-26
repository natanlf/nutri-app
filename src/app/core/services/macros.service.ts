import { Injectable } from '@angular/core';
import { Food, MyFood } from '../models/food';

@Injectable({
  providedIn: 'root'
})
export class MacrosService {

  constructor() { }

  calculateMacros(food: MyFood, quantity: number): Food {
    const factor = quantity / food.quantity;

    return {
      name: food.name,
      origin: food.origin,
      carb: food.carb * factor,
      kcal: food.kcal * factor,
      quantity,
      protein: food.protein * factor,
      fat: food.fat * factor,
      fiber: food.fiber * factor,
      sodium: food.sodium * factor,
      unity: food.unity
    };
  }

}
