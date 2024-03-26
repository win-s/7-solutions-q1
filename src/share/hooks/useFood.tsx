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

export const useFood = ()=>{
    const [foods,setFoods] = useState(getInitialFoods());

    const foodStateRef = useRef<Food[]>();
    foodStateRef.current = foods;

    const {onRemoveTimer,onAddTimer} = useTimer(10,onTimeOut);

    function onTimeOut(foodsTimeout: Timer[]){
        if(foodsTimeout?.length === 0)return;

        const ids = foodsTimeout.map( time => time.food.name);
        removeFromBasket(ids);

    }

    const removeFromBasket = (ids:string[])=>{
        if(!foodStateRef.current) return;

        let newFoods = foodStateRef.current;

        for(let i=0;i<ids.length;i++){
            const food = newFoods.filter( food => food.name === ids[i])[0];
            newFoods = changeFoodState(newFoods,ids[i],{
                status: CatagoryStatus.Waiting,
                index: 0,
            })
        }

        newFoods = changeOrders(newFoods,ids);
        setFoods(newFoods); 
    }
    const addToBasket = (id:string)=>{

        let newFoods = changeFoodState(foods,id,{
            status: CatagoryStatus.Basket,
        })

        newFoods = changeOrder(newFoods,id);
        setFoods(newFoods);
    }
    const changeOrder = (foods:Food[],id:string)=>{
        const index = foods.findIndex( food => food.name === id);
        return [
            ...foods.slice(0,index),
            ...foods.slice(index+1),
            foods[index],
        ]
    }
    function changeOrders(foods:Food[],ids:string[]){
        let newFoods = foods;
        for(let i=0;i<ids.length;i++){
            newFoods = changeOrder(newFoods,ids[i])
        }
        return newFoods;
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
