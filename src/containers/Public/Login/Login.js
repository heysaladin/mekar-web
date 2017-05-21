import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';
import FacebookAccountButton from 'components/FacebookAccountButton/FacebookAccountButton';
import IconButton from 'material-ui/IconButton';
import FaFacebook from 'react-icons/lib/fa/facebook';
import FaGooglePlus from 'react-icons/lib/fa/google-plus';
import Card from 'material-ui/Card/Card';

import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';

import { Container, Content, Spacer, Message } from '../../UI';

import styles from './loginStyles';
import LoginForm from './LoginForm';

@injectSheet(styles)
@connect(
  state => ({ user: state.auth.user }),
  { ...notifActions, ...authActions })
export default class Login extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static defaultProps = {
    user: null,
  }

  state = {
    error: false
  }

  onLocalLogin = values => this.props.login('local', values)
    .then(this.handleSuccess)
    .catch(error => this.setState({ error: error.errors }));

  onFacebookLogin = (err, data) => {
    if (err) return;
    this.props.login('facebook', data, false)
      .then(this.handleSuccess)
      .catch(error => {
        if (error.message === 'Incomplete oauth registration') {
          this.context.router.push({
            pathname: '/register',
            state: { oauth: error.data }
          });
        }
      });
  };

  onGoogleLogin = (err, data) => {
    console.log(err);
    console.log(data);
    // not yet implemented
  };

  handleSuccess = data => {
    this.props.notifSend({
      message: 'Berhasil login'
    });
    return data;
  };

  FacebookLoginButton = ({ facebookLogin }) =>
    <IconButton
      onTouchTap={facebookLogin}
      tooltip="Facebook"
      iconStyle={styles.socialLoginSmallIcon} style={Object.assign({
        background: '#507CBD'
      }, styles.socialLoginSmall)}>
      <FaFacebook />
    </IconButton>;

  render() {
    const { sheet: { classes } } = this.props;

    return (
      <Container>
        <Helmet title="Masuk" />
        <Spacer />
        <Card>
          <Content>
            <div className={classes.wrap}>
              <h3 style={styles.fontTitle}>Masuk ke Akun Anda</h3>

              <Message
                visibility={this.state.error}
                type="error"
                text={<span> Email atau Kata Sandi salah. <strong> Coba lagi </strong></span >}
              />
              <Spacer />

              <LoginForm onSubmit={this.onLocalLogin} />

              <Spacer />
              <Spacer />
              <Spacer />

              <span>Atau masuk lewat</span>
              <div>
                <FacebookAccountButton
                  appId="635147529978862"
                  fields="name,email,picture"
                  onLogin={this.onFacebookLogin}
                  component={this.FacebookLoginButton}
                />
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                  <IconButton
                    tooltip="Google+"
                    iconStyle={styles.socialLoginSmallIcon}
                    style={Object.assign({
                      background: '#F06261'
                    }, styles.socialLoginSmall)}>
                    <FaGooglePlus />
                  </IconButton>
                </a>
              </div>
            </div>

            <Spacer />
            <Spacer />
          </Content>
        </Card>

        <Spacer />

      </Container>
    );
  }
}
