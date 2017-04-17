import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import InfoBar from './InfoBar';

describe('InfoBar', () => {
  it('should have one container', () => {
    const wrapper = shallow(<InfoBar />);
    expect(wrapper.find('.container'))
      .to
      .have
      .length(1);
  });

  it('should have props for email and src', () => {
    const wrapper = shallow(<InfoBar />);
    expect(wrapper.props().email).to.be.defined;
    expect(wrapper.props().src).to.be.defined;
  });
});
