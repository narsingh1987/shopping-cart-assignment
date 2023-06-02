import { call, takeEvery, put } from 'redux-saga/effects';
import { productActions } from './slice';

import { APIResponse, IProduct } from '../types';
import { getAll, getItemsByCategory } from '../../helpers/product';

function* fetchAll() {
  try {
    const response: APIResponse = yield call(getAll);
    yield put(productActions.setItems(response.data as IProduct[]));
  } catch (error) {
    console.log('Product Saga fetchAll - ', error);
  }
}

function* fetchByCategory(action: any) {
  try {
    const response: APIResponse = yield call(
      getItemsByCategory,
      action.payload
    );
    yield put(productActions.setItems(response.data as IProduct[]));
  } catch (err) {
    console.log('Product Saga fetchByCategory - ', err);
  }
}

export function* productSaga() {
  yield takeEvery(productActions.getItems, fetchAll);
  yield takeEvery(productActions.getItemsByCategory, fetchByCategory);
}
