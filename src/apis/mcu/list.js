import request from 'apis/axios';

const LOCALHOST = process.env.REACT_APP_API_HOST || 'http://localhost:5000';

export async function getMCUList() {
  const response = await request({
    url: '/api/mcu/getlist',
    baseURL: LOCALHOST,
    method: 'get',
  });
  console.log(response);
  return response.data;
}

export async function addMCUList({ name, host, port }) {
  const response = await request({
    url: '/api/mcu/addlist',
    baseURL: LOCALHOST,
    method: 'post',
    data: { name, host, port },
  });
  console.log(response);
  return response.data;
}

export async function deleteMCUList({ id }) {
  const response = await request({
    url: '/api/mcu/deletelist',
    baseURL: LOCALHOST,
    method: 'post',
    data: { id },
  });
  console.log(response);
  return response.data;
}

export async function updateMCUList({
  id,
  name,
  host,
  port,
}) {
  const response = await request({
    url: '/api/mcu/updatelist',
    baseURL: LOCALHOST,
    method: 'post',
    data: {
      id,
      name,
      host,
      port,
    },
  });
  console.log(response);
  return response.data;
}
