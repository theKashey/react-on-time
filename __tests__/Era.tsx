import * as React from 'react';
import {mount} from 'enzyme';
import {Era} from "../src";

describe('Era', () => {
  it('Call callbacks on mount', () => {
    const spy = jest.fn();
    const wrapper = mount(<Era onStart={spy}/>);
    expect(spy).toHaveBeenCalled();
  });

  it('Call callbacks on unmount', () => {
    const spy = jest.fn();
    const wrapper = mount(<Era onEnd={spy}/>);
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
  });

  it('Renders children', () => {
    const wrapper = mount(<Era><span>1</span><span>2</span></Era>);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
