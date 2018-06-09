import * as React from 'react';
import {Component} from 'react';
import * as PropTypes from 'prop-types';

export interface ComponentProps {
  delay: number;
  pause?: boolean;
  onTick: (tick: number) => any;
  children?: (tick: number) => React.ReactNode;
}

export interface ComponentState {
  tick: number
}

export class Interval extends Component<ComponentProps, ComponentState> {
  state = {
    tick: 0
  };

  static propTypes = {
    delay:PropTypes.number.isRequired,
    pause: PropTypes.bool,
    onTick: PropTypes.func,
    children: PropTypes.func
  };

  timeout: number;

  componentDidMount() {
    this.start()
  }

  componentDidUpdate(prevProps:ComponentProps) {
    if (prevProps.delay !== this.props.delay || prevProps.pause !== this.props.pause) {
      this.stop();
      this.start();
    }
  }

  componentWillUnmount() {
    this.stop()
  }

  start() {
    if (!this.props.pause) {
      this.timeout = window.setInterval(() => {
        this.setState(({tick}) => ({tick: tick + 1}), () =>
          this.props.onTick && this.props.onTick(this.state.tick)
        )
      }, this.props.delay || 1000);
    }
  }

  stop() {
    this.timeout && window.clearInterval(this.timeout);
  }

  render() {
    return this.props.children
      ? this.props.children(this.state.tick)
      : null;
  }
}