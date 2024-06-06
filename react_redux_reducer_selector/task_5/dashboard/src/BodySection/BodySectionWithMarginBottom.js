import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import BodySection from './BodySection';

class BodySectionWithMarginBottom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={css(styles.bodySectionWithMargin)}>
        <BodySection {...this.props} />
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

BodySectionWithMarginBottom.defaultProps = {
  title: null,
  children: null
};

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px'
  }
});

export default BodySectionWithMarginBottom;
