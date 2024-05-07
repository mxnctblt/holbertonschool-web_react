import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends Component {
  render() {
    return (
      <li
        onClick={() => this.props.handleClick(this.props.id)}
        data-notification-type={this.props.type}
        dangerouslySetInnerHTML={this.props.html}
      >
        {this.props.value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  html: PropTypes.shape({ __html: PropTypes.string }),
  value: PropTypes.string,
  handleClick: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  handleClick: () => {},
};
export default NotificationItem;
