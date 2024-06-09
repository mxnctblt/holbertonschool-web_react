import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#deb5b545',
    height: '40px',
  },
  row: {
    backgroundColor: '#f5f5f5ab',
    height: '40px',
  },
  rowChecked: {
    backgroundColor: '#e6e4e4',
  },
});

const CourseListRow = ({ isHeader, textFirstCell, textSecondCell, isChecked, onChangeRow }) => {
  const handleCheckboxChange = (e) => {
    onChangeRow(e.target.checked);
  };

  if (isHeader) {
    return (
      <tr className={css(styles.header)}>
        <th colSpan={textSecondCell ? 1 : 2}>{textFirstCell}</th>
        {textSecondCell && <th>{textSecondCell}</th>}
      </tr>
    );
  }

  return (
    <tr className={css(styles.row, isChecked && styles.rowChecked)}>
      <td>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isChecked: PropTypes.bool,
  onChangeRow: PropTypes.func,
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
  isChecked: false,
  onChangeRow: () => {},
};

export default CourseListRow;
