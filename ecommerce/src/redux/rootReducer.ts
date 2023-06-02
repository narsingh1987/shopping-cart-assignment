import { counterReducer } from './counter/slice';
import { cartReducer } from './cart/slice';
import { productReducer } from './product/slice';
import { categoryReducer } from './category/slice';
import { bannerReducer } from './banner/slice';

const rootReducer = {
  counter: counterReducer,
  cart: cartReducer,
  product: productReducer,
  category: categoryReducer,
  banner: bannerReducer,
};

export default rootReducer;
