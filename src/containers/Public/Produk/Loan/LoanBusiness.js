import React, { Component, PropTypes } from 'react';
import View from 'react-flexbox';
import { Field, reduxForm } from 'redux-form';
import { TextField, DatePicker } from 'redux-form-material-ui';
import { createValidator, required, minLength, email } from 'utils/validation';
import { number, letter } from 'utils/masking';
import injectSheet from 'react-jss';

import { MaterialUITimePicker } from '../../../../components';
import { Spacer, Button } from '../../../UI';
import dataConstant from '../../../../data/constant.json';

import styles from './loanBusinessStyles';
@injectSheet(styles)

@reduxForm({
  form: 'formLoanBusiness',
  formKey: 'formLoanBusiness',
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
    callTime: [required],
    callHour: [required],
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

export default class LoanBusiness extends Component {
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

    values.type = dataConstant.LOAN_BUSINESS;

    return onSubmit(values);
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const { sheet: {
        classes
      } } = this.props;
    return (
      <div className={classes.textCenter}>
        <h4>Pinjam Usaha</h4>
        <div>Perluas potensi pengembangan bisnis anda menggunakan produk Pinjaman Usaha,
          dengan lama pinjaman yang fleksibel, bunga yang rendah dan limit nilai pinjaman
          yang mencapai 100 juta rupiah. Silahkan isi formulir dibawah ini dan operasional
          kami akan segera menghubungi anda.</div>
        <Spacer />
        <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
          <div className={classes.textLeft}>
            <div className={classes.note}>* Wajib diisi</div>
          </div>
          <div className={classes.textLeft}>
            <Field
              name="name"
              component={TextField}
              floatingLabelText="Nama *"
              ref={(textField) => { this.name = textField; }}
              normalize={letter}
              fullWidth />
            <Field
              name="email"
              component={TextField}
              floatingLabelText="Email *"
              ref={(textField) => { this.email = textField; }}
              fullWidth />
            <Field
              name="handphone"
              component={TextField}
              floatingLabelText="Nomor Handphone *"
              ref={(textField) => { this.handphone = textField; }}
              normalize={number}
              fullWidth />
            <View auto row>
              <View column width="65%">
                <Field
                  name="callTime"
                  component={DatePicker}
                  floatingLabelText="Waktu untuk dihubungi *"
                  defaultValue={null}
                  minDate={new Date()}
                  ref={(textField) => { this.callTime = textField; }}
                  fullWidth />
              </View>
              <View column width="25%">
                <Field
                  name="callHour"
                  component={MaterialUITimePicker}
                  floatingLabelText="Jam *"
                  ref={(textField) => { this.callHour = textField; }}
                  fullWidth />
              </View>
            </View>
            <Field
              name="address"
              component={TextField}
              floatingLabelText="Alamat *"
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
            id="loan-business-filling-submit"
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
