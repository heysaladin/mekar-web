import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import styles from './loaderStyles';
import iconLoader from './loader.gif';

/**
 * @class Loader
 * @extends {Component}
 */
@injectSheet(styles)
export default class Loader extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    label: PropTypes.string
  };

  static defaultProps = {
    label: 'Sedang memuat...'
  }

  render() {
    const { sheet: {
        classes
      }, label } = this.props;

    return (
      <div className={classes.root}>
        <img src={iconLoader} alt="pinjam-loader" className={classes.icon} />
        <br />
        <span>{label}</span>
      </div>
    );
  }
}
