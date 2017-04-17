import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import Helmet from 'react-helmet';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import injectSheet from 'react-jss';
// import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { Notifs } from 'components';
import { push } from 'react-router-redux';
import config from 'config';
import { asyncConnect } from 'redux-connect';

import Theme from '../App/Theme';
injectTapEventPlugin();

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box',
      '&:focus': {
        outline: 'none',
      },
      '&:before': {
        boxSizing: 'border-box',
      },
      '&:after': {
        boxSizing: 'border-box',
      }
    },
    html: {
      margin: 0,
      padding: 0,
      height: '100%',
    },
    body: {
      margin: 0,
      padding: 0,
      height: '100%',
      fontFamily: 'Roboto, sans-serif',
      // -webkit-font-smoothing: antialiased,
      textRendering: 'optimizeLegibility',
      fontWeight: 400,
      color: '#4B4B4B',
      background: '#F0F0F0',
    }
  },
  notifs: {
    margin: '15px 0'
  }
};

@injectSheet(styles)
@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }
    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()));
    // }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    notifs: state.notifs,
    user: state.auth.user
  }),
  { logout, pushState: push })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
    // router: PropTypes.object.isRequired,
    user: PropTypes.object,
    // notifs: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static defaultProps = {
    user: null
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      // const redirect = this.props.router.location.query && this.props.router.location.query.redirect;
      // this.props.pushState(redirect || '/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const { sheet: { classes }, children } = this.props;

    return (
      <div>
        <Helmet {...config.app.head} />
        <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
          <div>
            {children}

            <Notifs
              className={classes.notifs}
              namespace="global"
              NotifComponent={props =>
                <Snackbar open message={props.message} autoHideDuration={6000} />
              }
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
