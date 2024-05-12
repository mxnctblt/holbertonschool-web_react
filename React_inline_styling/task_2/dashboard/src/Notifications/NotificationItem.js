import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
  },
});

const NotificationItem = memo(function NotificationItem({
  id,
  type,
  html,
  value,
  handleClick,
}) {
  const notificationStyle = type === 'urgent' ? styles.urgent : styles.default;

  return (
    <li
      onClick={() => handleClick(id)}
      className={css(notificationStyle)}
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