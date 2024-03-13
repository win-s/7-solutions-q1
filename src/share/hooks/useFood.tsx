import {useEffect, useState, useRef} from 'react';
import {FoodCatagory,CatagoryStatus,Food } from '../constants/food';
import {useTimer,Timer} from './useTimer';

const getInitialFoods = () =>{
    const foods = [
        {
            type: 'Fruit',
            name: 'Apple',
        },
        {
            type: 'Vegetable',
            name: 'Broccoli',
        },
        {
            type: 'Vegetable',
            name: 'Mushroom',
        },
        {
            type: 'Fruit',
            name: 'Banana',
        },
        {
            type: 'Vegetable',
            name: 'Tomato',
        },
        {
            type: 'Fruit',
            name: 'Orange',
        },
        {
            type: 'Fruit',
            name: 'Mango',
        },
        {
            type: 'Fruit',
            name: 'Pineapple',
        },
        {
            type: 'Vegetable',
            name: 'Cucumber',
        },
        {
            type: 'Fruit',
            name: 'Watermelon',
        },
        {
            type: 'Vegetable',
            name: 'Carrot',
        },
    ];
    return foods.map( food => ({
        ...food,
        status: CatagoryStatus.Waiting,
        index: 0,
    } as Food));
}

const changeFoodState = (foods:Food[],id:string,state:Partial<Food>)=>{
    const index = foods.findIndex( food => food.name === id);
    const newFoods = [...foods];
    newFoods[index] = {
        ...foods[index],
        ...state,
    }
    return newFoods;
}

interface ColumIndex{
    Fruit: number,
    Vegetable: number;
}

export const useFood = ()=>{
    const [foods,setFoods] = useState(getInitialFoods());
    const [columnIndex, setColumnIndex] = useState<ColumIndex>({ Fruit:0,Vegetable:0})

    const foodStateRef = useRef<Food[]>();
    foodStateRef.current = foods;

    const colStateRef = useRef<ColumIndex>();
    colStateRef.current = columnIndex;

    const {onRemoveTimer,onAddTimer} = useTimer(10,onTimeOut);

    function onTimeOut(foodsTimeout: Timer[]){
        if(foodsTimeout?.length === 0)return;

        const ids = foodsTimeout.map( time => time.food.name);
       removeFromBasket(ids);

    }

    const removeFromBasket = (ids:string[])=>{
        if(!foodStateRef.current) return;
        if(!colStateRef.current) return;

        let newFoods = foodStateRef.current;
        let columnLength = JSON.parse(JSON.stringify(colStateRef.current));
        for(let i=0;i<ids.length;i++){
            const food = newFoods.filter( food => food.name === ids[i])[0];
            columnLength[food.type]--;
            newFoods = changeFoodState(newFoods,ids[i],{
                status: CatagoryStatus.Waiting,
                index: 0,
            })
        }


        setFoods(newFoods); 
        setColumnIndex(columnLength)
    }
    const addToBasket = (id:string)=>{
        const food = foods.filter( food => food.name === id)[0];
        const index = columnIndex[food.type];
        const newFoods = changeFoodState(foods,id,{
            status: CatagoryStatus.Basket,
            index: index+1,
        })
        setFoods(newFoods);
        setColumnIndex({
            ...columnIndex,
            [food.type]: index+1,
        })
    }

    const onBasketClick = (id: string)=>{
        onRemoveTimer(id);
        removeFromBasket([id]);
    };
    const onWaitingStatusClick = (id: string)=>{
        const food = foods.filter( food => food.name === id)[0];
        onAddTimer(food);
        addToBasket(id);
    };

    return {foods,onWaitingStatusClick,onBasketClick}
}
