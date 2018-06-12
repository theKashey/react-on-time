import * as React from 'react';
import {mount} from 'enzyme';
import {Interval} from "../src";

describe.only('Interval', () => {
  it('Interval check', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    jest.useFakeTimers();
    const wrapper = mount(<Interval delay={42} onTick={spy1}>{tick => spy2(tick) || null}</Interval>);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 42);
    wrapper.unmount();
    jest.useRealTimers();
  });

  it('Smoke', (done) => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const wrapper = mount(<Interval delay={10} onTick={spy1}>{tick => spy2(tick) || null}</Interval>);

    expect(spy1).toHaveBeenCalledWith(0);
    expect(spy2).toHaveBeenCalledWith(0);
    setTimeout(() => {
      expect(spy1).toHaveBeenCalledWith(1);
      expect(spy2).toHaveBeenCalledWith(1);
      setTimeout(() => {
        expect(spy1).toHaveBeenCalledWith(2);
        expect(spy2).toHaveBeenCalledWith(2);
        wrapper.unmount();
        done();
      }, 50)
    }, 50);
  });

  it('Dont call on unmount', (done) => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const wrapper = mount(<Interval delay={42} onTick={spy1}>{Interval => spy2(Interval) || null}</Interval>);

    expect(spy1).toHaveBeenCalledWith(0);
    expect(spy2).toHaveBeenCalledWith(0);
    wrapper.unmount();
    setTimeout(() => {
      expect(spy1).not.toHaveBeenCalledWith(1);
      expect(spy2).not.toHaveBeenCalledWith(1);
      wrapper.unmount();
      done();
    }, 100);
  });
});
