/* eslint-disable import/prefer-default-export */
import request from 'apis/axios';

const LOCALHOST = 'http://localhost:5000';

async function getMCUList() {
  const response = await request({
    url: '/api/mcu/list',
    baseURL: LOCALHOST,
    method: 'get',
  });
  console.log(response);
  return response.data;
}

export {
  getMCUList,
};
