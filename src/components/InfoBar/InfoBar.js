import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { load } from 'redux/modules/info';

import styles from './infoBarStyles';

// @connect(
//   state => ({ info: state.info.data }),
//   { load })
export default class InfoBar extends Component {
  static propTypes = {
    info: PropTypes.object
  }

  static defaultProps = {
    info: null
  };

  render() {
    return (
      <div className={`${styles.infoBar} well`}>
        <div className="container">
          This is an info bar
        </div>
      </div>
    );
  }
}
