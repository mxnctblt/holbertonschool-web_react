import React from "react";
import BodySection from "./BodySection";
import { css, StyleSheet } from "aphrodite";


const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: '40px',
    marginTop: '-40px',
  }
});


class BodySectionWithMarginBottom extends React.Component {
  render() {
    return (
      <>
        <div className={css(styles.bodySectionWithMargin)}>
          <BodySection {...this.props} />
        </div>
      </>
    )
  }
}

BodySectionWithMarginBottom.propTypes = {
  ...BodySection.propTypes
};

export default BodySectionWithMarginBottom;
