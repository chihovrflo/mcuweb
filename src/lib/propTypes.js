import propTypes from 'prop-types';

const match = propTypes.shape({
  params: propTypes.shape({}),
});

export default {
  match,
};
