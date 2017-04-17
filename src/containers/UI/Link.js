import React, { Component, PropTypes } from 'react';
import { Link as ReactRouterLink } from 'react-router';
import Layout from '../App/Layout';

const defaultStyle = {
  root: {
    fontSize: Layout.fontSize,
    fontWeight: 700,
    color: Layout.textColor,
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

class Link extends Component {

  render() {
    const rootStyle = defaultStyle.root;

    return (
      <ReactRouterLink {...this.props} style={rootStyle}>{this.props.children}</ReactRouterLink>
    );
  }
}

Link.propTypes = {
  children: PropTypes.any.isRequired
};

export default Link;
