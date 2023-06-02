import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
  Id: string;
  Qty: number;
}

export interface ICart {
  Items: ICartItem[];
}

const initialState: ICart = {
  Items: [],
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const index = state.Items.findIndex(
        (item) => item.Id === action.payload.Id
      );
      if (index >= 0) state.Items[index].Qty += 1;
      else state.Items.push(action.payload);
    },
    removeQty: (state, action: PayloadAction<ICartItem>) => {
      const index = state.Items.findIndex(
        (item) => item.Id === action.payload.Id
      );
      if (index >= 0) {
        if (state.Items[index].Qty > 1) state.Items[index].Qty -= 1;
        else state.Items.splice(index, 1);
      }
    },
    removeItem: (state, action: PayloadAction<ICartItem>) => {
      const updatedCartItems = state.Items.filter(
        (item) => item.Id !== action.payload.Id
      );
      state.Items = updatedCartItems;
    },
  },
});

export const { actions: cartActions, reducer: cartReducer } = CartSlice;
