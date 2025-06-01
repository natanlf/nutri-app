import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-footer',
  standalone: false,
  templateUrl: './food-footer.component.html',
  styleUrl: './food-footer.component.css'
})
export class FoodFooterComponent implements OnInit {

  foodsObservable$: Observable<any>;
  foodList: Array<any> = [];
  totalMacros!: {protein: number, fat: number, carb: number};

  constructor(private store: Store<{ foods: Array<any> }>) {
    this.foodsObservable$ = this.store.pipe(select('foods'));
  }

  ngOnInit(): void {
    this.foodsObservable$.subscribe( data => {
      this.foodList = data.foods;
      this.sumFoodList();
    }) 
  }

  sumFoodList() {
     this.totalMacros = this.foodList.reduce( (acumulator, item) => {
      return {
        protein: (acumulator.protein || 0) + item.protein,
        fat: (acumulator.fat || 0) + item.fat,
        carb: (acumulator.carb || 0) + item.carb
      }
    });

    console.log(this.totalMacros)
  }

}
