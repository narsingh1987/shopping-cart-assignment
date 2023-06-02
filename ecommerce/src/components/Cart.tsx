import React from 'react';
import { cartActions, ICart, ICartItem } from '../redux/cart/slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { apiURL } from '../helpers/api_helper';

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
      <section className="my-cart-item">
        <div className="container">
          <div className="row">
            {Items != null && Items.length > 0
              ? Items.map((item, index) => {
                  return (
                    <div className="col-12">
                      <div className="row item-text-cart">
                        <div className="col-xl-2 col-lg-2 col-md-3 col-3">
                          <div className="img">
                            <img
                              src={`${apiURL}/${item.imageURL ?? ''}`}
                              alt={item.name}
                            ></img>
                          </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-7 col-6">
                          <div className=""></div>
                          <div className="text">
                            <div className="item-name">{item.name}</div>
                            <div className="add-digit">
                              <button onClick={() => removeQty(item)}>-</button>
                              <span className="digit">{item.Qty}</span>{' '}
                              <button onClick={() => addQty(item)}>+</button>
                              <span className="velue">{item.price}</span>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-8 col-lg-8 col-md-2 col-3">
                          <div className="totle-price">
                            Rs. {item.Qty * item.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
