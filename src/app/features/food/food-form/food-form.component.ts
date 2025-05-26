import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food, MyFood } from '../../../core/models/food';
import {UUID} from 'uuid-generator-ts';
import { Store } from '@ngrx/store';
import { updateOrAddFood } from '../../../store/actions/foods.action';
import { MacrosService } from '../../../core/services/macros.service';

@Component({
  selector: 'app-food-form',
  standalone: false,
  templateUrl: './food-form.component.html',
  styleUrl: './food-form.component.css'
})
export class FoodFormComponent implements OnInit, OnChanges {
  
  @Input() food!: Food;
  @Input() meal!: string;
  foodForm!: FormGroup;
  selectedFood: any = {};

  ngOnInit(): void {
    this.createFoodForm();
  }

  constructor(private store: Store, private macrosService: MacrosService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['food'].currentValue) {
      this.selectedFood = changes['food'].currentValue;
      
      if(this.foodForm) {
        this.setFoodForm(this.selectedFood);
        this.enableQuantity();
      }

    }
  }

  private setFoodForm(food: Food): void {
    this.foodForm.patchValue({
      name: food.name
    })
  }

  createFoodForm(): void {
    this.foodForm = new FormGroup({
      'name': new FormControl<string>(''),
      'quantity': new FormControl<number>({ value: 0, disabled: true }, [Validators.required, Validators.min(1)]),
      'id': new FormControl<string>(new UUID().getDashFreeUUID())
    });
  }

  enableQuantity() {
    this.quantity.enable();
  }

  updateQuantity(event: KeyboardEvent): void {
    //TODO -> calculate macros here
    let calculatedMacros = this.macrosService.calculateMacros(this.selectedFood, this.quantity.value)
    let food: MyFood = {
      id: this.id.value,
      name: this.name.value,
      quantity: this.quantity.value,
      meal: this.meal,
      origin: calculatedMacros.origin,
      fiber: calculatedMacros.fiber,
      carb: calculatedMacros.carb,
      kcal: calculatedMacros.kcal,
      protein: calculatedMacros.protein,
      fat: calculatedMacros.fat,
      unity: calculatedMacros.unity,
      sodium: calculatedMacros.sodium,  
      selectedFood: this.selectedFood
    };
    
    console.log(food)
    this.addToFood(food);
  }

  addToFood(myFood: MyFood) {
    this.store.dispatch(updateOrAddFood( { food: myFood } ))
  }

  onSubmit() {

  }

  get name() { return this.foodForm.get('name')! }
  get quantity() { return this.foodForm.get('quantity')! }
  get id() { return this.foodForm.get('id')! }
}
