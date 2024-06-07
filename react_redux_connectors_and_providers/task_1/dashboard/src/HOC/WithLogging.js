import React from 'react';


function WithLogging(WrappedComponent) {
  class WithLogging extends React.Component {
    componentDidMount() {
      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      console.log(`Component ${componentName} is mounted`);
    }

    componentWillUnmount() {
      const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      console.log(`Component ${componentName} is going to unmount`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLogging.displayName = `WithLogging(${displayName})`;
  return WithLogging;
}

export default WithLogging;
