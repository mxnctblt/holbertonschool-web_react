import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545',
  },
  defaultRow: {
    backgroundColor: '#f5f5f5ab',
  },
  tableHeader: {
    borderBottom: '1px rgb(178, 178, 178) solid',
    textAlign: 'left',
  },
  firstTableHeader: {
    textAlign: 'center',
  },
  table: {
    border: '1px rgb(178, 178, 178) solid',
  },
});

const CourseListRow = ({
  isHeader = false,
  textFirstCell,
  textSecondCell = null,
}) => {
  const rowStyle = isHeader ? styles.headerRow : styles.defaultRow;
  const thStyle = [styles.tableHeader];
  if (isHeader) {
    thStyle.push(styles.firstTableHeader);
  }

  return (
    <tr className={css(rowStyle)}>
      {isHeader ? (
        textSecondCell === null ? (
          <th className={css(thStyle)} colSpan={2}>
            {textFirstCell}
          </th>
        ) : (
          <>
            <th className={css(thStyle)}>{textFirstCell}</th>
            <th className={css(thStyle)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td>{textFirstCell}</td>
          <td>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
};

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CourseListRow;