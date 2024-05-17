export const getFullYear = () => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

export const getFooterCopy = (isIndex) => {
  if (isIndex) return 'Holberton School';
  return 'Holberton School main dashboard';
};

export const getLatestNotifications = () => {
  return `<strong>Urgent requirement</strong> - complete by EOD`;
};
