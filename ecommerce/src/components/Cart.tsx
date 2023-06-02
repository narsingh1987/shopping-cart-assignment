import React from 'react';

import { cartActions, ICart, ICartItem } from '../redux/cart/slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

function Cart(): JSX.Element {
  const dispatch = useAppDispatch();

  const { Items } = useAppSelector((state) => state.cart);

  const addQty = (item: ICartItem): void => {
    dispatch(cartActions.addItem(item));
  };

  const removeQty = (item: ICartItem): void => {
    dispatch(cartActions.removeQty(item));
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {Items != null && Items.length > 0
            ? Items.map((item, index) => {
                return (
                  <div>
                    Id : {item.Id}
                    Qty : {item.Qty}
                    <button onClick={() => removeQty(item)}>-</button>
                    &nbsp;&nbsp;&nbsp;
                    <button onClick={() => addQty(item)}>+</button>
                  </div>
                );
              })
            : ''}
        </div>
      </div>
    </>
  );
}

export default Cart;
