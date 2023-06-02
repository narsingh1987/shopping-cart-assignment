import { get } from './api_helper';

export const getAll = async () => {
  const url = '/api/banner/getAll';
  return get(url);
};
