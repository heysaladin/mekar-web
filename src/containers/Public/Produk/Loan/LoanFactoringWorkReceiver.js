import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { createValidator, required, minLength, maxLength, email } from 'utils/validation';
import { number, letter } from 'utils/masking';
import injectSheet from 'react-jss';

import { Spacer, Button, Link } from '../../../UI';

import styles from './loanFactoringWorkReceiverStyles';
@injectSheet(styles)

@reduxForm({
  form: 'formLoanFactoringWorkReceiver',
  formKey: 'formLoanFactoringWorkReceiver',
  validate: createValidator({
    workReceiverName: [
      required, minLength(3)
    ],
    workReceiverCompanyName: [required],
    workReceiverEmail: [
      required, email
    ],
    workReceiverHandphone: [
      required, minLength(7)
    ],
    workReceiverAddress: [
      required, minLength(10)
    ],
    workReceiverAddressCity: [
      required, minLength(4)
    ],
    workReceiverAddressDistrict: [
      required, minLength(4)
    ],
    workReceiverAddressVillage: [
      required, minLength(4)
    ],
    workReceiverAddressPostalCode: [required, minLength(4)]
  })
})

export default class LoanFactoringWorkReceiver extends Component {
  static propTypes = {
    saveError: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  handleSubmit = (values) => {
    const { handleNext, submitting, saveError } = this.props;

    setTimeout(() => {
      handleNext(values);
    }, 100);
  };

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      values
    } = this.props;
    const { sheet: {
        classes
      } } = this.props;
    return (
      <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
        <div className={classes.textLeft}>
          <div className={classes.note}>* Wajib diisi</div>
        </div>
        <div className={classes.textLeft}>
          <Field name="workReceiverName" component={TextField} floatingLabelText="Nama *" ref={(textField) => { this.workReceiverName = textField; }} normalize={letter} fullWidth />
          <Field name="workReceiverCompanyName" component={TextField} floatingLabelText="Nama Perusahaan *" ref={(textField) => { this.workReceiverCompanyName = textField; }} fullWidth />
          <Field name="workReceiverEmail" component={TextField} floatingLabelText="Email *" ref={(textField) => { this.workReceiverEmail = textField; }} fullWidth />
          <Field name="workReceiverHandphone" component={TextField} floatingLabelText="Nomor Handphone *" ref={(textField) => { this.workReceiverHandphone = textField; }} normalize={number} fullWidth />
          <Field name="workReceiverAddress" component={TextField} floatingLabelText="Alamat *" ref={(textField) => { this.workReceiverAddress = textField; }} fullWidth multiLine rows={4} rowsMax={4} />
          <Field name="workReceiverAddressCity" component={TextField} floatingLabelText="Kota *" ref={(textField) => { this.workReceiverAddressCity = textField; }} fullWidth />
          <Field name="workReceiverAddressDistrict" component={TextField} floatingLabelText="Kecamatan *" ref={(textField) => { this.workReceiverAddressDistrict = textField; }} fullWidth />
          <Field name="workReceiverAddressVillage" component={TextField} floatingLabelText="Kelurahan *" ref={(textField) => { this.workReceiverAddressVillage = textField; }} fullWidth />
          <Field name="workReceiverAddressPostalCode" component={TextField} floatingLabelText="Kode Pos *" ref={(textField) => { this.workReceiverAddressPostalCode = textField; }} normalize={number} fullWidth />
        </div>
        <Spacer />
        <Button label="Selanjutnya" type="submit" secondary />
      </form>
    );
  }
}
