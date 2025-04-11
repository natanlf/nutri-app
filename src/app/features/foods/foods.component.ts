import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../core/services/food.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { Food } from '../../core/models/food';
import { map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-foods',
  standalone: false,
  templateUrl: './foods.component.html',
  styleUrl: './foods.component.css'
})
export class FoodsComponent implements OnInit {
  title = 'nutriApp';
  private readonly foodService: FoodService;
  private readonly localStorageService: LocalStorageService;
  foods!: Food[];
  selectedFood?: Food; // ✅ armazenar comida selecionada

  filteredOptions$!: Observable<Food[]>;
  searchControl = new FormControl('');

  constructor(foodService: FoodService, localStorageService: LocalStorageService) {
    this.foodService = foodService;
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
    this.checkVersion();
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

  checkVersion() {
    if (this.localStorageService.hasNewVersion()) {
      this.getFoodsFromServer();
    } else {
      this.getFoodsFromLocalStorage();  
    }
  }

  getFoodsFromLocalStorage() {
    this.foods = this.localStorageService.getFoods();
    this.loadFilter();
  }
  
  getFoodsFromServer() {
    this.foodService.getFoods().subscribe({
      next: value => {
        this.foods = value;
        this.saveFoodsAndVersionInLocalStorage();
        this.loadFilter();
      },
      error: err => console.log(err),
      complete: () => console.log("Finished get clients")
    });
  }
  
  saveFoodsAndVersionInLocalStorage() {
    this.localStorageService.saveFoods(this.foods);
    this.localStorageService.saveVersion();
  }
  
}
