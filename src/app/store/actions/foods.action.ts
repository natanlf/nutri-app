import { createAction, props } from "@ngrx/store";
import { MyFood } from "../../core/models/food";

export const updateOrAddFood = createAction(
    'Update or Add Food',
    props<{ food: MyFood }>()
)