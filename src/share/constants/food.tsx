export enum FoodCatagory {
    Fruit = 'Fruit',
    Vegetable = 'Vegetable',
}
export enum CatagoryStatus {
    Waiting = 'Waiting',
    Basket = 'Basket',
}
export interface Food {
    type: FoodCatagory,
    name: string,
    timer: number | undefined,
    status: CatagoryStatus,
    index: number ;
}
