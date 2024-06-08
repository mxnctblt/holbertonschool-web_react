import React, { PureComponent } from "react";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";

const opacityFrames = {
  'from': {
    opacity: 0.5,
  },
  'to': {
    opacity: 1,
  }
};

const bounceFrames = {
  '0%': {
    transform: 'translateY(0px)',
  },
  '100%': {
    transform: 'translateY(5px)',
  }
};

const styles = StyleSheet.create({
  notifications: {
    padding: "15px",
    border: "2px dashed #e11d3f",
    fontFamily: "Times New Roman, Times, serif",
    width: "35%",
    float: "right",
    fontSize: "20px",
    backgroundColor: "#fff8f8",
    "@media (max-width: 900px)": {
      width: "100%",
      height: "100vh",
      position: "fixed",
      zIndex: 1,
      top: 0,
      left: 0,
      backgroundColor: "white",
      margin: 0,
      padding: 0,
      border: "none",
    },
  },
  menuItem: {
    position: "absolute",
    right: 30,
    top: 0,
    fontSize: "20px",
    fontFamily: "Times New Roman, Times, serif",
    cursor: "pointer",
    ":hover": {
      animationName: [opacityFrames, bounceFrames],
      animationDuration: ["0.2s", "0.2s"],
      animationIterationCount: [3, 6],
      animationDirection: "alternate",
    },
  },
  menuItemActive: {
    animationName: [opacityFrames, bounceFrames],
    animationDuration: ["0.2s", "0.2s"],
    animationIterationCount: [3, 6],
    animationDirection: "alternate",
  },
  notificationList: {
    padding: 0,
    marginLeft: 10,
    "@media (max-width: 900px)": {
      marginLeft: 0,
    }
  },
  notificationListItem: {
    fontSize: "20px",
  },
});

class Notifications extends PureComponent {
  render() {
    const { displayDrawer, listNotifications = [], handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;
    const menuItemClass = listNotifications.length > this.props.listNotifications.length 
                          ? css(styles.menuItem, styles.menuItemActive)
                          : css(styles.menuItem);
    
    return (
      <>
        {!displayDrawer && (
          <div className={menuItemClass} data-test="menuItem" onClick={handleDisplayDrawer}>
            <p>Your notifications</p>
          </div>
        )}
        {displayDrawer && (
          <div className={css(styles.notifications)} data-test="notifications">
            <button
              style={{
                float: "right",
                top: "20px",
                right: "20px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              <img
                src={closeIcon}
                alt="close button"
                style={{ width: "12px", height: "12px" }}
              />
            </button>
            <p className={css(styles.notificationListItem)}>Here is the list of notifications</p>
            <ul className={css(styles.notificationList)}>
              {listNotifications.length > 0 ? (
                listNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={() => markNotificationAsRead(notification.id)}
                    id={notification.id}
                  />
                ))
              ) : (
                <li>No new notification for now</li>
              )}
            </ul>
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  listNotifications: [],
  markNotificationAsRead: () => {},
};

export default Notifications;
