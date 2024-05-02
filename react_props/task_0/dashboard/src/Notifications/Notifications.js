import React from 'react';
import './Notifications.css';
import { getLatestNotifications } from '../utils/utils';

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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotifications() }}
        />
      </ul>
    </div>
  );
};

export default Notifications;
