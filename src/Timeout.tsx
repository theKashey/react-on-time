import * as React from 'react';
import {Component} from 'react';
import * as PropTypes from 'prop-types';

export interface ComponentProps {
  timeout: number;
  then?: () => any;
  children?: (timedout: boolean) => React.ReactNode;
}

export interface ComponentState {
  timedout: boolean
}

export class Timeout extends Component<ComponentProps, ComponentState> {
  state = {
    timedout: false
  };

  static propTypes = {
    timeout: PropTypes.number.isRequired,
    then: PropTypes.func,
    children: PropTypes.func
  };

  timeout: number;

  componentDidMount() {
    this.timeout = window.setTimeout(() => {
      this.setState({timedout: true});
      this.props.then && this.props.then();
    }, this.props.timeout || 1000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  render() {
    return this.props.children
      ? this.props.children(this.state.timedout)
      : null;
  }
}