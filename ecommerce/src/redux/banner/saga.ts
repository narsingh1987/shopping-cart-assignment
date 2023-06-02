import { takeEvery, call, put } from 'redux-saga/effects';
import { bannerActions } from './slice';
import { APIResponse, IBanner } from '../types';
import { getAll } from '../../helpers/banner';

function* fetchItems() {
  try {
    const response: APIResponse = yield call(getAll);
    yield put(bannerActions.setItems(response.data as IBanner[]));
  } catch (err) {
    console.log('Banner Saga fetchItems - ', err);
  }
}

export function* bannerSaga() {
  yield takeEvery(bannerActions.getItems, fetchItems);
}
