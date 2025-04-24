import { MyFood } from "../core/models/food";

export interface FoodsStore {
    foods: MyFood[]
}

export const initialState: FoodsStore = {
    foods: []
}