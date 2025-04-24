import { createReducer, on } from "@ngrx/store";
import { initialState } from "../foodStore";
import { updateOrAddFood } from "../actions/foods.action";

export const foodReducer = createReducer(
    initialState,
    on(updateOrAddFood, (state, { food }) => {
        const exists = state.foods.some(f => f.id === food.id);
    
        const updatedFoods = exists
          ? state.foods.map(f => f.id === food.id ? { ...f, ...food } : f)
          : [...state.foods, food];
    
        return {
          ...state,
          foods: updatedFoods
        };
    })
)