import axios from 'axios';

export const apiURL: string =
  process.env.REACT_APP_API_URL != null
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:3000';

export const get = async (url: string) => {
  const completeURL = apiURL + url;
  console.log('get API Helper', completeURL);
  return await axios
    .get(completeURL)
    .then((response) => {
      console.log('Response', response);
      if (response.status >= 200) {
        return {
          data: response.data,
          status: true,
          statusCode: response.status,
          message: 'Success',
        };
      }
    })
    .catch((err: any) => {
      console.error('Error', err);
      return {
        status: false,
        statusCode: err.response.status,
        message: err?.response?.data
          ? err.response.data
          : 'Something went wrong',
      };
    });
};
