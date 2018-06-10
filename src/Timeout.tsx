import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IComponentProps {
  timeout: number;
  then?: () => any;
  children?: (timedout: boolean) => React.ReactNode;
}

export interface IComponentState {
  timedout: boolean
}

export class Timeout extends React.Component<IComponentProps, IComponentState> {
  static propTypes = {
    timeout: PropTypes.number.isRequired,
    then: PropTypes.func,
    children: PropTypes.func
  };

  state = {
    timedout: false
  };

  private timeout: number;

  componentDidMount() {
    this.timeout = window.setTimeout(() => {
      this.setState({timedout: true});

      if(this.props.then){
        this.props.then();
      }
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