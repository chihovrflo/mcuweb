import propTypes from 'prop-types';

const match = propTypes.shape({
  params: propTypes.shape({}),
});

const children = propTypes.oneOfType([
  propTypes.array,
  propTypes.object,
  propTypes.func,
  propTypes.string,
  propTypes.node,
]);

export default {
  match,
  children,
};
