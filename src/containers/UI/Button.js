import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import injectSheet from 'react-jss';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import Layout from '../App/Layout';

const styles = {
  buttonRoot: {
    minWidth: 175,
    height: 35,
    fontSize: Layout.fontSize
  }
};

// @injectSheet(styles)
class Button extends Component {

  static defaultProps = {
    submitting: false,
    submittingHide: false,
    submittingLabel: 'Sedang diproses...',
  }

  render() {
    const {
      submitting,
      submittingLabel,
      submittingHide,
      label,
      ...other
    } = this.props;

    const rootLabel = (submitting && submittingLabel)
      ? `${submittingLabel}...`
      : 'Sedang proses...';

    const realButton = (!submittingHide) ? <RaisedButton {...other} label={label} style={styles.buttonRoot} /> : null;

    return (!submitting)
      ? realButton
      : <FlatButton
        {...other}
        icon={<CircularProgress
          size={24} thickness={2} />} label={rootLabel} style={styles.buttonRoot} />;
  }
}

Button.propTypes = {
  submitting: PropTypes.bool,
  submittingLabel: PropTypes.string,
  submittingHide: PropTypes.bool,
  label: PropTypes.string.isRequired
};

export default Button;
