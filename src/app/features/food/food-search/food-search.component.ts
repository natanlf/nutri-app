import { Component, Input, OnInit } from '@angular/core';
import { Food } from '../../../core/models/food';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-food-search',
  standalone: false,
  templateUrl: './food-search.component.html',
  styleUrl: './food-search.component.css'
})
export class FoodSearchComponent implements OnInit {

  @Input() foods!: Food[];
  selectedFood?: Food; // ✅ armazenar comida selecionada

  filteredOptions$!: Observable<Food[]>;
  searchControl = new FormControl('');

  constructor() {
    this.loadFilter();
  }

  ngOnInit(): void {
    
  }

  private loadFilter() {
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? this.filter(value) : this.foods)
    );
  }

  displayFn(food: Food): string {
    return food && food.name ? food.name : '';
  }  

  onFoodSelected(food: Food) {
    this.selectedFood = food;
    console.log('Selecionado:', food);
  }


  private filter(value: string): Food[] {
    const filterValue = value.toLowerCase();
    return this.foods.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

}
