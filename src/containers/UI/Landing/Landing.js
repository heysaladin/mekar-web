import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import styles from './landingStyles';

@injectSheet(styles)
export default class Landing extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    sheet: PropTypes.object.isRequired,
    small: PropTypes.bool
  };

  static defaultProps = {
    small: false
  }

  render() {
    const { sheet: {
        classes
      }, children, small } = this.props;

    /**
     * Pengaturan height
     */
    const height = (small) ? 200 : 600;

    return (
      <div style={Object.assign({ height }, styles.container)}>
        <div className={classes.wrap}>
          {children}
        </div>
      </div>
    );
  }
}
