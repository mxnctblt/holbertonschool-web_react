import PropTypes from 'prop-types';

export const CourseShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  credit: PropTypes.number.isRequired,
};
