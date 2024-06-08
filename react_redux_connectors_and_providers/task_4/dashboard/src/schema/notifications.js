import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';


const user = new schema.Entity('users');
const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });
const notification = new schema.Entity('notifications', {
  author: user,
  context: message,
});

// Initial standardization of JSON file data
const normalizedData = normalize(notificationsData.default, [notification]);
export default normalizedData;

// Function to get all notifications
export function getAllNotificationsByUser(userId) {
  const notifications = normalizedData.entities.notifications;
  const messages = normalizedData.entities.messages;

  return Object.values(notifications)
    .filter(notification => notification.author === userId)
    .map(notification => messages[notification.context]);
}

// Utility function to standardize new notification data
export function notificationsNormalizer(data) {
  if (!data) return { entities: { notifications: {} } };
  return normalize(data, [notification]);
}