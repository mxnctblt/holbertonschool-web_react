import React from 'react';
import { getFooterCopy, getFullYear } from '../utils/utils';

const Footer = () => {
  const currentYear = getFullYear();
  const footerCopy = getFooterCopy(false);
  return (
    <footer className="App-footer">
      <p>
        Copyright {currentYear} - {footerCopy}
      </p>
    </footer>
  );
};

export default Footer;
