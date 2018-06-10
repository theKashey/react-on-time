import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IComponentProps {
  delay: number;
  pause?: boolean;
  onTick: (tick: number) => any;
  children?: (tick: number) => React.ReactNode;
}

export interface IComponentState {
  tick: number
}

export class Interval extends React.Component<IComponentProps, IComponentState> {
  static propTypes = {
    delay: PropTypes.number.isRequired,
    pause: PropTypes.bool,
    onTick: PropTypes.func,
    children: PropTypes.func
  };

  state = {
    tick: 0
  };

  private timeout: number;

  componentDidMount() {
    this.start()
  }

  componentDidUpdate(prevProps: IComponentProps) {
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
    if (this.timeout) {
      window.clearInterval(this.timeout);
      this.timeout = 0;
    }
  }

  render() {
    return this.props.children
      ? this.props.children(this.state.tick)
      : null;
  }
}