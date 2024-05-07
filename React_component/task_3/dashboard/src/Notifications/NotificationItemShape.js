import PropTypes from 'prop-types';

export const NotificationItemShape = {
  id: PropTypes.number.isRequired,
  html: PropTypes.shape({ _html: PropTypes.string }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};
