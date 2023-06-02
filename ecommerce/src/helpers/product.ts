import { get } from './api_helper';

export const getAll = async () => {
  const url = '/api/product/getAll';
  return get(url);
};

export const getItemsByCategory = async (categoryId: string) => {
  const url = `/api/product/getByCategory/${categoryId}`;
  return get(url);
};
