import React from 'react';
import logo from './logo.svg';

import './App.scss';
import { useFood } from './share/hooks/useFood';
import { WaitingList } from './share/components/WaitingList/WaitingList';
import { BasketList } from './share/components/BasketList/BasketList';
import { FoodCatagory } from './share/constants/food';

function App() {
  const {foods,onWaitingStatusClick,onBasketClick} = useFood();
  return (
    <>
    <div className="list-column">
      <WaitingList
        className="waiting-list-column"
        foods={foods}
        onClick={onWaitingStatusClick}
      ></WaitingList>
      <BasketList
        className="fruit-column"
        foods={foods}
        type={FoodCatagory.Fruit}
        onClick={onBasketClick}
      ></BasketList>
      <BasketList
        foods={foods}
        type={FoodCatagory.Vegetable}
        onClick={onBasketClick}
      ></BasketList>
    </div>
    {/* {JSON.stringify(foods)} */}
    </>
  );
}

export default App;
