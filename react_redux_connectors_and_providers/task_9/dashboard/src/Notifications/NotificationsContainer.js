import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Notifications from "./Notifications";
import { fetchNotifications, markAsRead, setNotificationFilter } from '../actions/notificationActionCreators';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

const NotificationsContainer = ({ fetchNotifications, listNotifications, displayDrawer, handleDisplayDrawer, handleHideDrawer, ...props }) => {
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
  }, [listNotifications]);

  return (
    <Notifications 
      listNotifications={listNotifications} 
      displayDrawer={displayDrawer} 
      handleDisplayDrawer={handleDisplayDrawer} 
      handleHideDrawer={handleHideDrawer} 
      {...props} 
    />
  );
};

NotificationsContainer.propTypes = {
  fetchNotifications: PropTypes.func.isRequired,
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
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    listNotifications: getUnreadNotificationsByType(state),
    filter: state.getIn(['notifications', 'filter']),
    displayDrawer: state.getIn(['ui', 'isNotificationDrawerVisible']),
  };
};

const mapDispatchToProps = {
  fetchNotifications,
  markAsRead,
  setNotificationFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);
