import React from 'react';
import './Notifications.css';
import { getLatestNotifications } from '../utils/utils';
import NotificationItem from './NotificationItem';

const Notifications = () => {
  return (
    <div className="Notifications">
      <button
        style={{
          position: 'absolute',
          top: `10px`,
          right: '10px',
          border: 'none',
          background: 'none',
          fontSize: '1.5rem',
        }}
        aria-label="Close"
        onClick={() => console.log('Close button has been clicked')}
      >
        &times;
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        <NotificationItem type="default" value="New course available" />
        <NotificationItem type="urgent" value="New resume available" />
        <NotificationItem
          type="urgent"
          html={{ __html: getLatestNotifications() }}
        />
      </ul>
    </div>
  );
};

export default Notifications;
