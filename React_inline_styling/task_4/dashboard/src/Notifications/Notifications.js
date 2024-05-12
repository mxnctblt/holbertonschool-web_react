import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  handleButtonClick = () => {
    console.log('Close button has been clicked');
  };

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
      if (this.props.listNotifications.length < nextProps.listNotifications.length) return true;
    return false;
  }

  render() {
    const { displayDrawer } = this.props;
    const menuItemStyle = css(this.props.displayDrawer ? styles.hidden : styles.MenuItem);

    const buttonStyle = {
      background: 'transparent',
      border: 'none',
      position: 'absolute',
      top: 10,
      right: 10,
    };

    return (
      <>
        <div className={menuItemStyle}>
          <p>Your notifications</p>
        </div>
        {displayDrawer ? (
          <div className={css(styles.Notifications, styles.small)} id="Notifications">
            {this.props.listNotifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <button style={buttonStyle} aria-label='Close' onClick={this.handleButtonClick}>
                  <img src={closeIcon} alt='Close' width={12} />
                </button>
                <ul className={css(styles.noPadding)}>
                  {this.props.listNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={this.markAsRead}
                      id={notification.id}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : null}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

const opacityAnimationFrames = {
  '0%': {
      opacity: 0.5,
  },
    '100%': {
      opacity: 1,
  },
};

const bounceAnimationFrames = {
  '0%': {
      transform: 'translateY(0px)',
  },
  '50%': {
      transform: 'translateY(-5px)',
  },
  '100%': {
      transform: 'translateY(5px)',
  },
};

const styles = StyleSheet.create({
  MenuItem: {
    display: 'flex',
    justifyContent: 'right',
    padding: '5px',
    marginRigth: '10px',
    background: '#fff8f8',
    float: 'right',
    ':hover': {
      cursor: 'pointer',
      animationName: [opacityAnimationFrames, bounceAnimationFrames],
      animationDuration: '1s, 0.5s',
      animationTimingFunction: 'ease-in-out',
      animationIterationCount: '3',
    },
  },
  hidden: {
    display: 'none'
  },
  Notifications: {
    border: 'dashed #e11d3f',
    padding: '8px',
    position: 'absolute',
    width: '30%',
    right: '1rem',
    top: '4rem',
  },
  small: {
    '@media (max-width: 900px)': {
      padding: 0,
      fontSize: 20,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      background: 'white',
      zIndex: 10
    }
  },
  noPadding: {
    '@media (max-width: 900px)': {
      padding: 0,
    }
  }
});

export default Notifications;
