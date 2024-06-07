import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

describe('utility functions', () => {
  test('getFullYear returns the current year', () => {
    expect(getFullYear()).toBe(new Date().getFullYear());
  });

  test('getFooterCopy returns correct string when true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('getFooterCopy returns correct string when false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });

  test('getLatestNotification returns the correct string', () => {
    expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
