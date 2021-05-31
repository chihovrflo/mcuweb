/* eslint-disable import/prefer-default-export */
import request from 'apis/axios';

const LOCALHOST = 'http://localhost:5000';

async function getMCUList() {
  const response = await request({
    url: '/api/mcu/getlist',
    baseURL: LOCALHOST,
    method: 'get',
  });
  console.log(response);
  return response.data;
}

async function addMCUList() {
  const response = await request({
    url: '/api/mcu/addlist',
    baseURL: LOCALHOST,
    method: 'post',
  });
  console.log(response);
  return response.data;
}

export {
  getMCUList,
  addMCUList,
};
