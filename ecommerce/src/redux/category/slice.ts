import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICategory {
  name: string;
  key: string;
  description: string;
  enabled: boolean;
  order: number;
  imageUrl: string;
  id: string;
}

export interface ICategoryState {
  categories: ICategory[];
}

const initialState: ICategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getItems: (state) => {},
    setItems: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { actions: categoryActions, reducer: categoryReducer } =
  categorySlice;
