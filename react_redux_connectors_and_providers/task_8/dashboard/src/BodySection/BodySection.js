import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';


const styles = StyleSheet.create({
  bodySection: {
    marginTop: '59px',
    marginLeft: '20px',
    fontSize: '1.1rem',
    whiteSpace: 'nowrap'
  }
});


class BodySection extends React.Component {
  render() {
    const { children, title } = this.props;
    return (
      <>
        <div className={css(styles.bodySection)}>
          <h2>{title}</h2>
          {children}
        </div>
      </>
    );
  }
}

BodySection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

export default BodySection;
