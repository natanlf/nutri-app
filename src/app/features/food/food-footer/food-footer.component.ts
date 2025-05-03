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

  constructor(private store: Store<{ foods: Array<any> }>) {
    this.foodsObservable$ = this.store.pipe(select('foods'));
  }

  ngOnInit(): void {
    this.foodsObservable$.subscribe( data => {
      console.log(data)
      this.foodList.concat(data.foods)
    }) 
  }

}
