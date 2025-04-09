import { Component, OnInit } from '@angular/core';
import { FoodService } from './services/food.service';
import { LocalStorageService } from './services/local-storage.service';
import { Food } from './domain/food';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'nutriApp';
  private readonly foodService: FoodService;
  private readonly localStorageService: LocalStorageService;
  foods!: Food[];

  constructor(foodService: FoodService, localStorageService: LocalStorageService) {
    this.foodService = foodService;
    this.localStorageService = localStorageService;
    
  }
  ngOnInit(): void {
    this.checkVersion();
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
    console.log(this.foods)
  }
  
  getFoodsFromServer() {
    this.foodService.getFoods().subscribe({
      next: value => {
        this.foods = value;
        this.saveFoodsAndVersionInLocalStorage();
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
