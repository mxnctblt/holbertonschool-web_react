import React from "react";
import { css, StyleSheet } from "aphrodite";
import { getFullYear, getFooterCopy } from "../utils/utils";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { defaultUser } from '../App/AppContext';

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

export const Footer = ({ user = defaultUser }) => {
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

Footer.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  })
};

Footer.defaultProps = {
  user: defaultUser,
};

const mapStateToProps = (state) => {
  return {
    user: state.getIn(['ui', 'user']) || defaultUser,
  };
};


export default connect(mapStateToProps)(Footer);
