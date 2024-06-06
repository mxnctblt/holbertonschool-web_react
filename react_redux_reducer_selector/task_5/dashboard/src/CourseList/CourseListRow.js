import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

function CourseListRow({ isHeader = false, textFirstCell, textSecondCell = null }) {
  // Define styles using Aphrodite
  const styles = StyleSheet.create({
    rowHeaderColor: {
      backgroundColor: '#deb5b545',
    },
    rowColor: {
      backgroundColor: '#f5f5f5ab',
    },
    rowChecked: {
      backgroundColor: '#e6e4e4',
    },
    thStyle: {
      padding: '0.4rem 0',
      borderBottom: 'solid 2px rgb(227, 220, 220)',
    },
    centerText: {
      textAlign: 'center',
    },
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  if (isHeader) {
    return (
      <tr className={css(isHeader ? styles.rowHeaderColor : styles.rowColor)}>
        {textSecondCell === null ? (
          <th colSpan="2" className={css(styles.thStyle, styles.centerText)}>{textFirstCell}</th>
        ) : (
          <>
            <th className={css(styles.thStyle)}>{textFirstCell}</th>
            <th className={css(styles.thStyle)}>{textSecondCell}</th>
          </>
        )}
      </tr>
    );
  } else {
    return (
      <tr className={isChecked ? css(styles.rowChecked) : ''}>
        <td>
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
          {textFirstCell}
        </td>
        <td>{textSecondCell}</td>
      </tr>
    );
  }
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

export default CourseListRow;
