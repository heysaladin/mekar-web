import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { createValidator, required, minLength, email } from 'utils/validation';
import { number, letter } from 'utils/masking';
import injectSheet from 'react-jss';

import { Spacer, Button } from '../../../UI';
import dataConstant from '../../../../data/constant.json';

import styles from './loanEmployeeStyles';
@injectSheet(styles)

@reduxForm({
  form: 'formLoanEmployee',
  formKey: 'formLoanEmployee',
  validate: createValidator({
    name: [
      required, minLength(3)
    ],
    email: [
      required, email
    ],
    handphone: [
      required, minLength(7)
    ],
    companyName: [
      required, minLength(3)
    ],
    companyHrdName: [
      required, minLength(3)
    ],
    companyHrdHandphone: [
      required, minLength(7)
    ],
    address: [
      required, minLength(10)
    ],
    addressCity: [
      required, minLength(4)
    ],
    addressDistrict: [
      required, minLength(4)
    ],
    addressVillage: [
      required, minLength(4)
    ],
    addressPostalCode: [required, minLength(4)]
  })
})

export default class LoanEmployee extends Component {
  static propTypes = {
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  handleSubmit = (values) => {
    const { onSubmit } = this.props;

    values.type = dataConstant.LOAN_EMPLOYEE;

    return onSubmit(values);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const { sheet: {
        classes
      } } = this.props;
    return (
      <div className={classes.textCenter}>
        <h4>Pinjam Karyawan</h4>
        <div>Daftarkan diri dan perusahaan tempat Anda bekerja untuk bekerjasama dengan Pinjam.co.id dan manfaatkan fasilitas Pinjaman Karyawan dengan mengajak minimal 10 peserta dalam perusahaan yang sama. Maksimal pinjaman hingga 25 juta/orang. Silahkan isi formulir dibawah ini dan operasional kami akan segera menghubungi perusahaan anda.</div>
        <Spacer />
        <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
          <div className={classes.textLeft}>
            <div className={classes.note}>* Wajib diisi</div>
          </div>
          <div className={classes.textLeft}>
            <Field
              name="name"
              component={TextField}
              floatingLabelText="Nama Anda *"
              ref={(textField) => { this.name = textField; }}
              normalize={letter}
              fullWidth />
            <Field
              name="email"
              component={TextField}
              floatingLabelText="Email Anda *"
              ref={(textField) => { this.email = textField; }}
              fullWidth />
            <Field
              name="handphone"
              component={TextField}
              floatingLabelText="Nomor Telepon Anda *"
              ref={(textField) => { this.handphone = textField; }}
              normalize={number}
              fullWidth />
            <Field
              name="companyName"
              component={TextField}
              floatingLabelText="Nama Perusahaan *"
              ref={(textField) => { this.companyName = textField; }}
              fullWidth />
            <Field
              name="companyHrdName"
              component={TextField}
              floatingLabelText="Nama HRD Perusahaan *"
              ref={(textField) => { this.companyHrdName = textField; }}
              fullWidth />
            <Field
              name="companyHrdHandphone"
              component={TextField}
              floatingLabelText="Nomor Telepon Perusahaan *"
              ref={(textField) => { this.companyHrdHandphone = textField; }}
              normalize={number}
              fullWidth />
            <Field
              name="address"
              component={TextField}
              floatingLabelText="Alamat Perusahaan *"
              ref={(textField) => { this.address = textField; }}
              fullWidth
              multiLine
              rows={4}
              rowsMax={4} />
            <Field
              name="addressCity"
              component={TextField}
              floatingLabelText="Kota *"
              ref={(textField) => { this.addressCity = textField; }}
              fullWidth />
            <Field
              name="addressDistrict"
              component={TextField}
              floatingLabelText="Kecamatan *"
              ref={(textField) => { this.addressDistrict = textField; }}
              fullWidth />
            <Field
              name="addressVillage"
              component={TextField}
              floatingLabelText="Kelurahan *"
              ref={(textField) => { this.addressVillage = textField; }}
              fullWidth />
            <Field
              name="addressPostalCode"
              component={TextField}
              floatingLabelText="Kode Pos *"
              ref={(textField) => { this.addressPostalCode = textField; }}
              normalize={number}
              fullWidth />
          </div>

          <Spacer />
          <Spacer />
          <Spacer />
          <Button
            id="loan-employee-filling-submit"
            label="Ajukan Pinjaman"
            type="submit"
            submitting={submitting}
            secondary />
        </form>
        <Spacer />
        <Spacer />
      </div>
    );
  }
}
