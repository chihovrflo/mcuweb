import axios from 'axios';
import propTypes from 'prop-types';

export default async function request({
  method,
  url,
  baseURL,
  headers,
  params,
  data,
}) {
  try {
    return await axios({
      method,
      url,
      baseURL,
      headers,
      params,
      data,
    });
  } catch (error) {
    throw new Error(error);
  }
}

request.propTypes = {
  method: propTypes.oneOf(['get', 'post', 'patch']).isRequired,
  url: propTypes.string.isRequired,
  baseURL: propTypes.string.isRequired,
  headers: propTypes.shape({}),
  params: propTypes.shape({}),
  data: propTypes.shape({}),
};
