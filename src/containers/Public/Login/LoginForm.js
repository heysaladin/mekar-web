import React, { Component } from 'react';
import { reduxForm, Field, propTypes } from 'redux-form';
import { TextField, Checkbox } from 'redux-form-material-ui';

import { Spacer, Button, Link } from '../../UI';

import styles from './loginStyles';
import loginValidation from './loginValidation';

@reduxForm({ form: 'login', validate: loginValidation })
export default class LoginForm extends Component {
  static propTypes = {
    ...propTypes
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>

        <div style={styles.textAlignLeft}>
          <Field
            name="username"
            component={TextField}
            floatingLabelText="Email"
            fullWidth />
          <Field
            name="password"
            component={TextField}
            floatingLabelText="Kata Sandi"
            type="password"
            fullWidth />
        </div>

        <Spacer />
        <div style={styles.alignRight}>
          <Link to="/lupa-kata-sandi">Lupa Kata Sandi?</Link>
        </div>

        <Spacer />
        <Spacer />

        <Field
          name="rememberMe"
          component={Checkbox}
          label="Biarkan saya tetap masuk"
          style={styles.rememberMe} />

        <Spacer />
        <Button
          id="login-submit"
          type="submit"
          label="Masuk"
          submitting={submitting}
          secondary />
      </form>
    );
  }
}
