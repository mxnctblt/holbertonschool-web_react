import { getFooterCopy, getFullYear, getLatestNotifications } from './utils';

test('Get the current year', () => {
  expect(getFullYear()).toBe(new Date().getFullYear());
});

test('getFooterCopy return the appropriate string', () => {
  expect(getFooterCopy(true)).toBe('Holberton School');
  expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
});

test('getLatestNotifications return the appropriate string', () => {
  expect(getLatestNotifications()).toBe(
    '<strong>Urgent requirement</strong> - complete by EOD'
  );
});
