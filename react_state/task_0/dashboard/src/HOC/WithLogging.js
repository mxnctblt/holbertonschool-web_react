import React, { Component } from 'react';

class WithLogging extends Component {
  constructor(props) {
    super(props);
    this.displayName = `WithLogging(${this.getName()})`;
  }
  getName() {
    return this.props.children.type.name
      ? this.props.children.type.name
      : this.props.children.props.className
      ? this.props.children.props.className
      : 'Component';
  }

  componentDidMount() {
    console.log(`Component ${this.getName()} is mounted`);
  }

  componentWillUnmount() {
    console.log(`Component ${this.getName()} is going to unmount`);
  }

  render() {
    return this.props.children;
  }
}

export default WithLogging;
