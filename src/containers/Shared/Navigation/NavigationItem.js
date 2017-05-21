import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { ListItem } from 'material-ui/List';

import Layout from '../../App/Layout';


const styles = {
  navigationItem: {
    fontSize: Layout.fontSize + 1,
    fontWeight: 'bold'
  }
};

class NavigationItem extends Component {

  static propTypes = {
    afterTouch: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    toAction: PropTypes.func,
    leftIcon: PropTypes.node
  };

  static defaultProps = {
    leftIcon: null,
    to: null,
    toAction: () => {}
  };

  goTo = (route) => {
    const { afterTouch } = this.props;

    afterTouch();
    browserHistory.push(route);
  };

  render() {
    const { label, to, leftIcon, toAction, afterTouch } = this.props;

    return (
      <ListItem
        leftIcon={leftIcon}
        primaryText={label}
        style={styles.navigationItem}
        onTouchTap={(e) => {
          e.preventDefault();
          if (to !== null) {
            this.goTo(to);
          } else {
            toAction();
            afterTouch();
          }
        }}
      />
    );
  }
}

export default NavigationItem;
