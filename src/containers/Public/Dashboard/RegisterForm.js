import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { reduxForm,
  // Field,
  propTypes } from 'redux-form';
// import { TextField } from 'redux-form-material-ui';

// import {
//   // number,
//   letter } from 'utils/masking';
// import { Spacer, Button, Link } from '../../UI';

import regstyles from './registerStyles';
import registerValidation from './registerValidation';

@injectSheet(regstyles)
@reduxForm({ form: 'dashboard', validate: registerValidation })
export default class RegisterForm extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    ...propTypes
  }

  render() {
    const { sheet: {
      classes
    }, handleSubmit,
    // submitting
  } = this.props;

    return (
      <form onSubmit={handleSubmit} noValidate>
        <div className={classes.textAlignLeft}>
          {/* <Field
            name="name"
            component={TextField}
            floatingLabelText="Nama Lengkap"
            normalize={letter}
            fullWidth />*/}
          {/* <Field
            name="handphone"
            type="tel"
            component={TextField}
            floatingLabelText="Nomor Handphone"
            normalize={number}
            fullWidth />
          <Field
            name="email"
            type="email"
            component={TextField}
            floatingLabelText="Email"
            fullWidth />
          <Field
            name="password"
            type="password"
            component={TextField}
            floatingLabelText="Kata Sandi"
            fullWidth />
          {/**
          <Field
            name="referral_code"
            component={TextField}
            floatingLabelText="Kode Referral (jika ada)"
            ref="referralCode"
            fullWidth/>
          */}
        </div>
        {/*
        <Spacer />
        <Spacer />
        <p>Dengan mendaftar sebagai anggota berarti Anda menerima &nbsp;<br />
          <Link to="/bantuan/syarat-ketentuan" target="_blank">Syarat & Ketentuan</Link>
        </p>
        <Spacer />
        <Button
          id="signup-submit"
          label="Daftar"
          type="submit"
          submitting={submitting}
          secondary />*/}
      </form>
    );
  }
}
