import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { createValidator, required, minLength, email } from 'utils/validation';
import { number, letter } from 'utils/masking';
import injectSheet from 'react-jss';

import { Spacer, Button, Link, ImagePicker } from '../../../UI';

import styles from './loanFactoringWorkGiverStyles';
@injectSheet(styles)

@reduxForm({
  form: 'formLoanFactoringWorkGiver',
  formKey: 'formLoanFactoringWorkGiver',
  validate: createValidator({
    workGiverName: [
      required, minLength(3)
    ],
    workGiverCompanyName: [required],
    workGiverEmail: [
      required, email
    ],
    workGiverHandphone: [
      required, minLength(7)
    ],
    workGiverInvoiceDoc: [
      required, minLength(4)
    ],
    workGiverInvoiceNumber: [
      required, minLength(4)
    ],
    workGiverAddress: [
      required, minLength(10)
    ],
    workGiverAddressCity: [
      required, minLength(4)
    ],
    workGiverAddressDistrict: [
      required, minLength(4)
    ],
    workGiverAddressVillage: [
      required, minLength(4)
    ],
    workGiverAddressPostalCode: [required, minLength(4)]
  })
})

export default class LoanFactoringWorkGiver extends Component {
  static propTypes = {
    handleNext: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired
  }

  state = {
    invoice: null
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  handleSubmit = (values) => {
    const { handleNext } = this.props;

    return handleNext(values);
  };

  render() {
    const { handlePrev, handleSubmit, submitting, values } = this.props;
    const { sheet: {
        classes
      } } = this.props;
    return (
      <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
        <div style={classes.textLeft}>
          <Link onTouchTap={handlePrev}>&lt; Kembali</Link>
          <div style={classes.note}>* Wajib diisi</div>
        </div>
        <div style={classes.textLeft}>
          <Field
            name="workGiverName"
            component={TextField}
            floatingLabelText="Nama *"
            ref={(textField) => { this.workGiverName = textField; }}
            normalize={letter}
            fullWidth />
          <Field
            name="workGiverCompanyName"
            component={TextField}
            floatingLabelText="Nama Perusahaan *"
            ref={(textField) => { this.workGiverCompanyName = textField; }}
            fullWidth />
          <Field
            name="workGiverEmail"
            component={TextField}
            floatingLabelText="Email *"
            ref={(textField) => { this.workGiverEmail = textField; }}
            fullWidth />
          <Field
            name="workGiverHandphone"
            component={TextField}
            floatingLabelText="Nomor Handphone *"
            ref={(textField) => { this.workGiverHandphone = textField; }}
            normalize={number}
            fullWidth />
          <Field
            name="workGiverInvoiceNumber"
            component={TextField}
            floatingLabelText="Nomor Tagihan *"
            ref={(textField) => { this.workGiverInvoiceNumber = textField; }}
            fullWidth />
          <Field
            name="workGiverInvoiceDoc"
            label="Dokumen Tagihan *"
            component={(field) => <ImagePicker
              field={field}
              defaultMessage="Unggah Dokumen Tagihan disini"
              eventHandlers={{
                success: (event, response) => {
                  if (field.meta.valid !== true) {
                    field.input.onChange(response.data);
                  }
                }
              }} />} />
          <Field
            name="workGiverAddress"
            component={TextField}
            floatingLabelText="Alamat *"
            ref={(textField) => { this.workGiverAddress = textField; }}
            fullWidth
            multiLine
            rows={4}
            rowsMax={4} />
          <Field
            name="workGiverAddressCity"
            component={TextField}
            floatingLabelText="Kota *"
            ref={(textField) => { this.workGiverAddressCity = textField; }}
            fullWidth />
          <Field
            name="workGiverAddressDistrict"
            component={TextField}
            floatingLabelText="Kecamatan *"
            ref={(textField) => { this.workGiverAddressDistrict = textField; }}
            fullWidth />
          <Field
            name="workGiverAddressVillage"
            component={TextField}
            floatingLabelText="Kelurahan *"
            ref={(textField) => { this.workGiverAddressVillage = textField; }}
            fullWidth />
          <Field
            name="workGiverAddressPostalCode"
            component={TextField}
            floatingLabelText="Kode Pos *"
            ref={(textField) => { this.workGiverAddressPostalCode = textField; }}
            normalize={number}
            fullWidth />
        </div>
        <Spacer />
        <Button
          label="Ajukan Pinjaman"
          type="submit"
          submitting={submitting}
          secondary />
      </form>
    );
  }
}
