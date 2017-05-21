import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Layout from '../App/Layout';
// import Theme from '../App/Theme';

const styles = {
  title: {
    fontFamily: Layout.fontTitle,
    fontSize: Layout.fontSize + 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    margin: '20px auto',
    color: 'white'
  },
  subTitle: {
    textAlign: 'center',
    fontSize: Layout.fontSize,
    paddingBottom: Layout.margin
  }
};

@injectSheet(styles)
class Header extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string
  };

  static defaultProps = {
    secondaryText: null
  };

  render() {
    const { sheet: { classes }, primaryText, secondaryText } = this.props;

    return (
      <div>
        <h4 className={classes.title}>{primaryText}</h4>
        {secondaryText && <div className={classes.subTitle}>{secondaryText}</div>}
      </div>
    );
  }
}

export default Header;
