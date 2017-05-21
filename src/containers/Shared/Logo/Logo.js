import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Link } from 'react-router';

import logo from './logo.png';

const styles = {
  root: {
    height: 40,
    width: 130.6,
    // backgroundSize: '100%',
    backgroundSize: 'contain',
    backgroundColor: 'transparent',
    backgroundImage: `url(${logo})`,
    backgroundPosition: 'left center',
    backgroundRepeat: 'no-repeat'
  }
};

@injectSheet(styles)
class Logo extends Component {

  static defaultProps = {
    sheet: {},
    className: ''
  }

  render() {
    const { sheet: { classes }, className } = this.props;

    return (
      <Link to="/">
        <div className={`${classes.root} ${className}`}></div>
      </Link>
    );
  }
}

Logo.propTypes = {
  sheet: PropTypes.object,
  className: PropTypes.string
};

export default Logo;
