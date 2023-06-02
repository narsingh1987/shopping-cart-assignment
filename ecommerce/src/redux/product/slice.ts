import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IProduct {
  name: string;
  imageURL: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  sku: string;
  id: string;
}

export interface IProductState {
  products: IProduct[];
}

const initialState: IProductState = {
  products: [],
};

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getItemsByCategory: (state, action: PayloadAction<string>) => {},
    getItems: (state) => {},
    setItems: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
  },
});

export const { actions: productActions, reducer: productReducer } =
  ProductSlice;
