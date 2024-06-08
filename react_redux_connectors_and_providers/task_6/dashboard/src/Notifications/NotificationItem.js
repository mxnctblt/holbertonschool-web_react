import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  default: {
    color: "blue",
    cursor: "pointer",
    "@media (max-width: 900px)": {
      fontSize: "20px",
      borderBottom: "2px solid black",
      listStyle: "none",
      width: "100%",
      padding: "10px 8px",
    },
  },

  urgent: {
    color: "red",
    cursor: "pointer",
    "@media (max-width: 900px)": {
      fontSize: "20px",
      borderBottom: "2px solid black",
      listStyle: "none",
      width: "100%",
      padding: "10px 8px",
    },
  },
});

function NotificationItem({ type, html, value, markAsRead, id }) {
  const style = type === "urgent" ? styles.urgent : styles.default;
  return (
    <>
      <li className={css(style)} data-notification-type={type} onClick={() => markAsRead(id)} >
        {html ? (
          <span dangerouslySetInnerHTML={html} />
        ) : (
          value
        )}
      </li>
    </>
  );
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

NotificationItem.defaultProps = {
  markAsRead: () => {},
};

export default React.memo(NotificationItem);
