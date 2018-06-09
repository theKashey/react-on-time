import * as React from 'react';
import {Component} from 'react';

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