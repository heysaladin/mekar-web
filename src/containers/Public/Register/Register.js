import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import * as notifActions from 'redux/modules/notifs';
import Card from 'material-ui/Card/Card';

import { Container, Content, Spacer, Link } from '../../UI';

import styles from './registerStyles';
import RegisterForm from './RegisterForm';

/**
 * Halaman Register
 *
 * @export
 * @class Register
 * @extends {Component}
 */
@injectSheet(styles)
@connect(() => ({}), {
  ...notifActions,
  ...authActions
})
export default class Register extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    notifSend: PropTypes.func.isRequired
  }

  /**
   * Cek apakah sedang dalam keadaan oauth / tidak
   *
   * @returns {boolean}
   * @memberOf Register
   */
  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  // register = data => this.successRegister(data);
  /**
   * Handle registrasi
   *
   * @param {object} data - Berisi username, password, dan rememberme
   * @return {Promise<data>}
   * @memberOf Register
   */
  register = (data: {message: string, user_id: string}) => this.props.register(data).then(this.successRegister);

  /**
   * Handle sukses setelah login
   *
   * @param {object} result - Berisi info callbacks dari @function register
   * @return {object}
   * @memberOf Register
   */
  successRegister = (result: {message: string, user_id: string}) => {
    console.log('register done');
    this
      .props
      .notifSend({ message: 'You\'r now registered !', kind: 'success' });
    return result;
  }

  render() {
    const { sheet: {
        classes
      } } = this.props;
    return (
      <Container>
        <Helmet title="Daftar" />
        <Spacer />
        <Card>
          <Content>
            <div className={classes.wrap}>
              <h3 className={classes.fontTitle}>Selamat datang di Pinjam Indonesia</h3>

              <RegisterForm onSubmit={this.register} initialValues={this.getInitialValues()} />

              <Spacer />
              <Spacer />
              <p>Anda sudah punya akun ? &nbsp;
                <Link to="/masuk">Masuk disini</Link>
              </p>
              <Spacer />
            </div>
          </Content>
        </Card>

        <Spacer />

      </Container>
    );
  }
}
