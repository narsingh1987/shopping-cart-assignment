import { counterReducer } from './counter/slice';
import { cartReducer} from './cart/slice';

const rootReducer = {
  counter: counterReducer,
  cart : cartReducer
};

export default rootReducer;
