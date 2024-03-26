import { useEffect, useState, useRef } from "react";
import { interval } from 'rxjs';
import { Food } from "../constants/food";

export interface Timer {
    food: Food,
    time: number,
}
export interface FoodTimer{
    foods: Timer[],
    time: number,
}

export const useTimer = (duration:number,onTimeOut: (foods:Timer[])=>void)=>{

    const stateRef = useRef<FoodTimer>({foods:[],time:0});


    const onAddFood = (food:Food)=>{

        const foodsTimer = stateRef.current;
        const newFoodsTimeOut = [
            ...foodsTimer.foods,
            {
                food,
                time: foodsTimer.time+1,
            }
        ];

        stateRef.current = {
            ...foodsTimer,
            foods: newFoodsTimeOut
        }
    }
    const onRemoveFood = (id:string)=>{
        const foodsTimer = stateRef.current;

        const index = foodsTimer.foods.findIndex( timer => timer.food.name === id );
        const newFoodsTimeOut = [
            ...foodsTimer.foods.slice(0,index),
            ...foodsTimer.foods.slice(index+1),
        ];

        stateRef.current = {
            ...foodsTimer,
            foods: newFoodsTimeOut
        }
    }
    

    function clearFoodsTimeout(timer:number){

        const foodsTimeout: Timer[] = [];
        const foodsTimer = stateRef.current;
        
        if(!foodsTimer)return;

        for(let i=0;i<foodsTimer.foods.length;i++){
            const top = foodsTimer.foods[i];

            if(timer-top.time >= duration){
                foodsTimeout.push(top);
            }else{ break; }
        }
        
        if(foodsTimeout.length !==0){

            stateRef.current = {
                
                foods: foodsTimer.foods.slice(foodsTimeout.length),
                time: timer,
            };
            onTimeOut(foodsTimeout);
        }else{

            const foodsTimer = stateRef.current;
            stateRef.current = {
                ...foodsTimer,
                time: timer,
            }
        }
        
    }

    useEffect( ()=>{
        const intervalObserable = interval(500).subscribe(clearFoodsTimeout);
        
        return ()=> intervalObserable.unsubscribe();
    },[duration])

    return {
        onRemoveTimer: onRemoveFood,
        onAddTimer: onAddFood,
    }
}