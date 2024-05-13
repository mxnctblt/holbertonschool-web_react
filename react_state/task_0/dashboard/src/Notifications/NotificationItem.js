import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const NotificationItem = ({ id, value, type, html, markAsRead }) => {
  const styles = StyleSheet.create({
    default: {
        color: 'blue'
    },
    urgent: {
        color: 'red'
    },
    small: {
        '@media (max-width: 900px)': {
            padding: '10px 8px',
            fontSize: 20,
            listStyle: 'none',
            borderBottom: 'solid black 1px'
        }
    }
  });

  const listItemStyles = type === 'urgent' ? styles.urgent : styles.default;
  const style = css(listItemStyles, styles.small);

  return (
    <li
      className={style}
      data-notification-type={type}
      dangerouslySetInnerHTML={html}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
};

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  html: null,
  markAsRead: () => {},
};

export default React.memo(NotificationItem);
