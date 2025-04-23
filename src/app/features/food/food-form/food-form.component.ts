import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food } from '../../../core/models/food';

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
      name: food.name,
      fat: food.fat,
      fiber: food.fiber,
      kcal: food.kcal,
      origin: food.origin,
      protein: food.protein,
      sodium: food.sodium,
      unity: food.unity
    })
  }

  createFoodForm(): void {
    this.foodForm = new FormGroup({
      'name': new FormControl<string>(''),
      'quantity': new FormControl<number>({ value: 0, disabled: true }, [Validators.required]),
      'fat': new FormControl<number>(0, Validators.required),
      'fiber': new FormControl<number>(0, Validators.required),
      'kcal': new FormControl<number>(0, Validators.required),
      'origin': new FormControl<string>('', Validators.required),
      'protein': new FormControl<number>(0, Validators.required),
      'sodium': new FormControl<number>(0, Validators.required),
      'unity': new FormControl<string>('', Validators.required)
    });
  }

  enableQuantity() {
    this.quantity.enable();
  }

  onSubmit() {

  }

  get name() { return this.foodForm.get('name')! }
  get quantity() { return this.foodForm.get('quantity')! }
  get fat() { return this.foodForm.get('fat')! }
  get fiber() { return this.foodForm.get('fiber')! }
  get kcal() { return this.foodForm.get('kcal')! }
  get origin() { return this.foodForm.get('origin')! }
  get protein() { return this.foodForm.get('protein')! }
  get sodium() { return this.foodForm.get('sodium')! }
  get unity() { return this.foodForm.get('unity')! }
}
