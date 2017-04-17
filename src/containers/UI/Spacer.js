import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Layout from '../App/Layout';

const styles = {
  root: {
    width: '100%',
    height: Layout.margin - 5
  }
};

@injectSheet(styles)
class Spacer extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired
  };

  render() {
    const { sheet: { classes } } = this.props;

    return (
      <div className={classes.root}></div>
    );
  }
}

export default Spacer;
