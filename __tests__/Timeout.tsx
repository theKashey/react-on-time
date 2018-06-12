import * as React from 'react';
import {mount} from 'enzyme';
import {Timeout} from "../src";

describe('Timeout', () => {
  it('Timeout check', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    jest.useFakeTimers();
    const wrapper = mount(<Timeout timeout={42} then={spy1}>{timeout => spy2(timeout) || null}</Timeout>);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 42);
    jest.useRealTimers();
  });

  it('Smoke', (done) => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const wrapper = mount(<Timeout timeout={42} then={spy1}>{timeout => spy2(timeout) || null}</Timeout>);

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledWith(false);
    setTimeout(() => {
      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalledWith(true);
      done();
    }, 100);
  });

  it('Dont call on unmount', (done) => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const wrapper = mount(<Timeout timeout={42} then={spy1}>{timeout => spy2(timeout) || null}</Timeout>);

    expect(spy1).not.toHaveBeenCalled();
    expect(spy2).toHaveBeenCalledWith(false);
    wrapper.unmount();
    setTimeout(() => {
      expect(spy1).not.toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalledWith(true);
      done();
    }, 100);
  });
});
