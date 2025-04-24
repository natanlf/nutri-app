import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food, MyFood } from '../../../core/models/food';
import {UUID} from 'uuid-generator-ts';
import { Store } from '@ngrx/store';
import { updateOrAddFood } from '../../../store/actions/foods.action';

@Component({
  selector: 'app-food-form',
  standalone: false,
  templateUrl: './food-form.component.html',
  styleUrl: './food-form.component.css'
})
export class FoodFormComponent implements OnInit, OnChanges {
  
  @Input() food!: Food;
  foodForm!: FormGroup;
  selectedFood: any = {};

  ngOnInit(): void {
    this.createFoodForm();
  }

  constructor(private store: Store) {}

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
      'quantity': new FormControl<number>({ value: 0, disabled: true }, [Validators.required]),
      'id': new FormControl<string>(new UUID().getDashFreeUUID())
    });
  }

  enableQuantity() {
    this.quantity.enable();
  }

  updateQuantity(event: KeyboardEvent): void {
    let food: MyFood = {
      id: this.id.value,
      name: this.name.value,
      quantity: this.quantity.value,
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
