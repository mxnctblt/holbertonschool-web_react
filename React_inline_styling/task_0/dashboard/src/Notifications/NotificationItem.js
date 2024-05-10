import React, { memo } from 'react';
import PropTypes from 'prop-types';

const NotificationItem = memo(function NotificationItem({
  id,
  type,
  html,
  value,
  handleClick,
}) {
  return (
    <li
      onClick={() => handleClick(id)}
      data-notification-type={type}
      dangerouslySetInnerHTML={html}
    >
      {value}
    </li>
  );
});

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  handleClick: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  handleClick: () => {},
};

export default NotificationItem;
