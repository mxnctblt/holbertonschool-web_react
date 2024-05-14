import React from 'react';
import { getFooterCopy, getFullYear } from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  footer: {
    borderTop: '2px rgb(201, 45, 45) solid',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
});

const Footer = () => {
  const currentYear = getFullYear();
  const footerCopy = getFooterCopy(false);
  return (
    <footer className={css(styles.footer)}>
      <p>
        Copyright {currentYear} - {footerCopy}
      </p>
    </footer>
  );
};

export default Footer;