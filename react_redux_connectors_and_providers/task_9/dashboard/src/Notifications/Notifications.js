import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";

const opacityFrames = {
  'from': { opacity: 0.5 },
  'to': { opacity: 1 }
};

const bounceFrames = {
  '0%': { transform: 'translateY(0px)' },
  '100%': { transform: 'translateY(5px)' }
};

const styles = StyleSheet.create({
  notifications: {
    padding: "15px",
    border: "2px dashed #e11d3f",
    fontFamily: "Times New Roman, Times, serif",
    width: "35%",
    float: "right",
    fontSize: "17px",
    position: "absolute",
    right: 5,
    backgroundColor: "#fff8f8",
    zIndex: 1,
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
    marginRight: 10,
    "@media (max-width: 900px)": { marginLeft: 0 }
  },
  notificationListItem: {
    fontSize: "20px",
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    padding: "10px 20px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#e11d3f",
    color: "white",
    fontSize: "18px",
    borderRadius: "5px",
  }
});

const Notifications = ({ displayDrawer, listNotifications = [], handleDisplayDrawer, handleHideDrawer, markAsRead, setNotificationFilter }) => {
  const menuItemClass = listNotifications.length > 0 ? css(styles.menuItem, styles.menuItemActive) : css(styles.menuItem);

  return (
    <>
      {!displayDrawer && (
        <div className={menuItemClass} data-test="menuItem" onClick={() => { handleDisplayDrawer(); }}>
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
            onClick={() => { handleHideDrawer(); }}
          >
            <img src={closeIcon} alt="close button" style={{ width: "12px", height: "12px", margin: "10px" }} />
          </button>
          <p className={css(styles.notificationListItem)}>Here is the list of notifications</p>
          <div className={css(styles.buttonContainer)}>
            <button data-test="urgent-button" className={css(styles.button)} onClick={() => setNotificationFilter('URGENT')}>!!</button>
            <button data-test="default-button" className={css(styles.button)} onClick={() => setNotificationFilter('DEFAULT')}>?</button>
          </div>
          <ul className={css(styles.notificationList)}>
            {listNotifications.length > 0 ? (
              listNotifications.map((notification) => {
                const { id, context, html } = notification;
                const value = context && context.value ? context.value : null;
                const contextType = context && context.type ? context.type : 'default';
                return (
                  <NotificationItem
                    key={id}
                    type={contextType}
                    value={value}
                    html={html ? { __html: html.__html } : undefined}
                    markAsRead={() => markAsRead(id)}
                    id={id}
                  />
                );
              })
            ) : (
              <li>No new notification for now</li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  listNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      context: PropTypes.shape({
        guid: PropTypes.string,
        isRead: PropTypes.bool,
        type: PropTypes.string,
        value: PropTypes.string,
        html: PropTypes.shape({ __html: PropTypes.string })
      })
    })
  ),
  markAsRead: PropTypes.func,
  setNotificationFilter: PropTypes.func,
  filter: PropTypes.string,
};

Notifications.defaultProps = {
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  listNotifications: [],
  markAsRead: () => {},
  setNotificationFilter: () => {},
  filter: 'DEFAULT',
};

export default Notifications;
