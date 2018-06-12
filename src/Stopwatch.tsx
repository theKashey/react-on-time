import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface IComponentProps {
  timeout: number;
  onTick: (progress: number) => any;
  children?: (progress: number) => React.ReactNode;
}

export interface IComponentState {
  tick: number
}

export class Stopwatch extends React.Component<IComponentProps, IComponentState> {
  static propTypes = {
    timeout: PropTypes.number.isRequired,
    onTick: PropTypes.func,
    children: PropTypes.func
  };

  state = {
    tick: 0
  };

  private raf: number;
  private timeMount: number;

  componentDidMount() {
    this.timeMount = Date.now();
    this.tick()
  }

  componentWillUnmount() {
    this.stop()
  }

  tick() {
    if ((Date.now() - this.timeMount) < this.props.timeout) {
      this.raf = requestAnimationFrame(this.onTick);
    }
  }

  stop() {
    cancelAnimationFrame(this.raf);
  }

  onTick = () => {
    const {onTick} = this.props;
    if (onTick) {
      onTick(this.getProgress());
    }
    this.setState({tick: this.state.tick + 1}, this.tick);
  };

  getProgress() {
    return Math.min(1, (Date.now() - this.timeMount) / this.props.timeout);
  }

  render() {
    return this.props.children
      ? this.props.children(this.getProgress())
      : null;
  }
}