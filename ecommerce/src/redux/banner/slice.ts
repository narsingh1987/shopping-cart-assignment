import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IBanner {
  bannerImageUrl: string;
  bannerImageAlt: string;
  isActive: boolean;
  order: number;
  id: string;
}

export interface IBannerState {
  banners: IBanner[];
}

const initialState: IBannerState = {
  banners: [],
};

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    getItems: (state) => {},
    setItems: (state, action: PayloadAction<IBanner[]>) => {
      state.banners = action.payload;
    },
  },
});

export const { actions: bannerActions, reducer: bannerReducer } = bannerSlice;
