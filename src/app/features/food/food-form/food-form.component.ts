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

  ngOnInit(): void {
    this.createFoodForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['food'].currentValue) {
      let name = changes['food'].currentValue['name'];
      this.setName(name);
    }
  }

  private setName(name: string): void {
    this.foodForm.patchValue({
      name
    });
  }

  createFoodForm(): void {
    this.foodForm = new FormGroup({
      'name': new FormControl<string>(''),
      'quantity': new FormControl<number>(0, [Validators.required])  
    });
  }

  onSubmit() {

  }

  get name() { return this.foodForm.get('name')! }
  get quantity() { return this.foodForm.get('quantity')! }
}
