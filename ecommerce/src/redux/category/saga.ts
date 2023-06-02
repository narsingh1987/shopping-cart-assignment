import { takeEvery, call, put } from 'redux-saga/effects';
import { categoryActions } from './slice';
import { APIResponse, ICategory } from '../types';
import { getAll } from '../../helpers/category';

function* fetchItems() {
  try {
    const response: APIResponse = yield call(getAll);
    yield put(categoryActions.setItems(response.data as ICategory[]));
  } catch (err) {
    console.log('Category Saga fetchItems - ', err);
  }
}

export function* categorySaga() {
  yield takeEvery(categoryActions.getItems, fetchItems);
}
