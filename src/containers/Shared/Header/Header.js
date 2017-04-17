import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
// import Badge from 'material-ui/Badge';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
// import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import Layout from '../../App/Layout';
import Logo from '../Logo/Logo';

const styles = {
  container: Layout.container,
  header: {
    background: 'none',
    // boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
    boxShadow: 'none',
    height: 50,
    width: '100%',
    zIndex: 30,
    position: 'fixed',
    left: 0,
    top: 0
  },
  headerStyle: {
    height: 50,
    boxShadow: 'none',
    paddingLeft: 15,
    paddingRight: 15,
    background: 'none'
  },
  headerTitle: {
    position: 'absolute',
    top: 0,
    left: '50%',
    overflow: 'visible'
  },
  headerLogo: {
    margin: '0 auto',
    position: 'relative',
    top: 6
  },
  headerNotification: {
    padding: 12
  },
  headerNotificationBadge: {
    top: 6,
    right: 6,
    width: 18,
    height: 18
  }
};

@injectSheet(styles)
class Header extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    toggleNav: PropTypes.func.isRequired
  };

  render() {
    const { sheet: { classes }, toggleNav } = this.props;

    return (
      <div className={classes.header}>
        <div className={classes.container}>
          <AppBar
            onRightIconButtonTouchTap={toggleNav}
            iconElementLeft={<Logo className={classes.headerLogo} />}
            iconElementRight={<IconButton iconStyle={{ fill: '#fff' }}><NavigationMenu /></IconButton>}
            style={styles.headerStyle}
            titleStyle={styles.headerTitleStyle}
          />
        </div>
      </div>
    );
  }
}

export default Header;
