import React from 'react';

import './BasketList.scss';
import { Button } from '../Button/Button';
import { CatagoryStatus, Food, FoodCatagory } from '../../constants/food';

export const getBasketList = (foods:Food[],type:FoodCatagory) => foods
    .filter( 
        food => food.status === CatagoryStatus.Basket
                && food.type === type
    ).sort( (a:Food,b:Food) => a.index < b.index ? -1 : a.index === b.index ? 0:1 );

export const BasketList: React.FC<{
 foods: Food[],
 onClick: (id:string)=>void,
 type: FoodCatagory,
 className?: string;
}> = ({
    foods=[],
    onClick,
    type,
    className=''
}
)=>{
    const basketList = getBasketList(foods,type);
    return (
        <div className={`basket-list-wrapper ${className}`}>
            <div className="basket-list-header">{type}</div>
            <div className="basket-list-items">
            
            {
                basketList.map( food => <Button
                    key={food.name}
                    id={food.name}
                    text={food.name}
                    onClick={onClick}
                ></Button>)
            }
            </div>
        </div>
    );
}