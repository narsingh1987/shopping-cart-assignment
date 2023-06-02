import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import counterSagas from './counter/saga';
import { productSaga } from './product/saga';
import { categorySaga } from './category/saga';
import { bannerSaga } from './banner/saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([
    fork(counterSagas),
    fork(productSaga),
    fork(categorySaga),
    fork(bannerSaga),
  ]);
}
