export class Food {
    name!: string;
    origin!: 'ANIMAL' | 'VEGETAL' | string; // você pode ajustar os valores possíveis conforme necessário
    carb!: number;
    kcal!: number;
    fiber!: number;
    protein!: number;
    quantity!: number;
    fat!: number;
    unity!: 'G' | 'ML' | string; // ajuste conforme as unidades que for usar
    sodium!: number;
}

export class MyFood extends Food {
    id!: number;
    meal!: string;
    selectedFood!: Food;
}
  