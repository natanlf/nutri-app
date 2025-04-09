import { Injectable } from '@angular/core';
import { VERSION } from '../constants/constants';
import { Food } from '../domain/food';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  hasNewVersion() {
    let version = localStorage.getItem(keyVersion);
    return version !== VERSION;
  }

  saveVersion() {
    localStorage.setItem(keyVersion, VERSION);
  }

  saveFoods(foods: Food[]) {
    localStorage.setItem(keyFood, JSON.stringify(foods));
  }

  getFoods(): Food[] {
    let foods = localStorage.getItem(keyFood);
    if(foods) {
      return JSON.parse(foods);
    }
    return [];
  }
}

const keyVersion: string = "version";
const keyFood: string = "foods";
