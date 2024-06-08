import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from "aphrodite";

const headerStyle = { backgroundColor: '#deb5b545' };
const rowStyle = { backgroundColor: '#f5f5f5ab' };

const styles = StyleSheet.create({
  headerCentered: {
    textAlign: 'center',
    height: '40px',
  },
  headerLeftAligned: {
    textAlign: 'left',
    borderBottom: '3px solid rgb(194, 188, 188)',
    height: '40px',
  },
  row: {
    textAlign: 'left',
    padding: '0.8rem',
    borderBottom: '1px solid rgb(194, 188, 188)',
    height: '40px',
  },
  rowChecked: {
    backgroundColor: '#e6e4e4',
  },
});

const CourseListRow = ({ isHeader, textFirstCell, textSecondCell }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={headerStyle} className={css(styles.headerCentered)}>
          <th colSpan={2}>{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr style={headerStyle} className={css(styles.headerLeftAligned)}>
          <th>{textFirstCell}</th>
          <th>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr className={css(styles.row, isChecked && styles.rowChecked)}>
        <td>
          <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          {textFirstCell}
        </td>
        <td>{textSecondCell}</td>
      </tr>
    );
  }
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
