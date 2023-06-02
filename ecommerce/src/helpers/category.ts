import { get } from './api_helper';

export const getAll = async () => {
  const url = '/api/category/getAll';
  return get(url);
};
