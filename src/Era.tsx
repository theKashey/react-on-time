import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IComponentProps {
  onStart?: () => any
  onEnd?: () => any;
}

export class Era extends React.Component<IComponentProps> {
  static propTypes = {
    onStart: PropTypes.func,
    onEnd: PropTypes.func
  };

  componentDidMount() {
    if (this.props.onStart) {
      this.props.onStart();
    }
  }

  componentWillUnmount() {
    if (this.props.onEnd) {
      this.props.onEnd();
    }
  }

  render() {
    return (
      this.props.children
        ? <React.Fragment>{this.props.children}</React.Fragment>
        : null
    )
  }
}