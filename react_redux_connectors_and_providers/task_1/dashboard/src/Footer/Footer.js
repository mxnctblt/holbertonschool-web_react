import React, { useContext } from "react";
import { css, StyleSheet } from "aphrodite";
import { getFullYear, getFooterCopy } from "../utils/utils";
import { AppContext } from "../App/AppContext";


const styles = StyleSheet.create({
  p: {
    fontFamily: '"Times New Roman", Times, serif',
    fontStyle: 'italic',
    paddingBottom: '-10px',
    marginBottom: '25px',
  },

  hr: {
    position: 'fixed',
    width: '100%',
    border: '0.1rem solid #e11d3f',
    bottom: '100px',
  }
});


const Footer = () => {
  const { user } = useContext(AppContext);

  return (
    <>
      <footer>
      <hr className={css(styles.hr)} />
        <p className={css(styles.p)}>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
        {user.isLoggedIn &&  (
          <p>
            <a href='#'>Contact us</a>
          </p>
        )}
      </footer>
    </>
  );
};

export default Footer;
