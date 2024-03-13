import React from 'react';

import { Button } from '../Button/Button';
import { CatagoryStatus, Food } from '../../constants/food';

export const getWaitingList = (foods:Food[]) => foods.filter( food => food.status === CatagoryStatus.Waiting);

export const WaitingList: React.FC<{
 foods: Food[],
 onClick: (id:string)=>void,
 className?: string,
}> = ({
    foods=[],
    onClick,
    className,
}
)=>{
    const waitingList = getWaitingList(foods);
    return (
        <div className={className}>
         {
            waitingList.map( food => <Button
                key={food.name}
                id={food.name}
                text={food.name}
                onClick={onClick}
            ></Button>)
         }
        </div>
    );
}