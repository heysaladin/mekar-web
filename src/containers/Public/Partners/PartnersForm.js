import React, { Component, PropTypes } from 'react';
import MenuItem from 'material-ui/MenuItem';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as partnerActions from 'redux/modules/public/partners';
import { number, letter } from 'utils/masking';
import injectSheet from 'react-jss';

import { Spacer, Button } from '../../UI';
import partnersValidation from './partnersValidation';

import styles from './partnersFormStyles';
@injectSheet(styles)

@connect(state => ({ saveError: state.partners.saveError }), dispatch => bindActionCreators(partnerActions, dispatch))
@reduxForm({ form: 'formPartners', formKey: 'formPartners', validate: partnersValidation })

export default class PartnersForm extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    // fields: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    // invalid: PropTypes.bool.isRequired,
    // pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    // saveError: PropTypes.object,
    // formKey: PropTypes.string.isRequired,
    // values: PropTypes.object,
    onHandleSuccess: PropTypes.func.isRequired
  };

  handleRegister = (values) => {
    const { save, onHandleSuccess } = this.props;

    return save(values).then(result => {
      onHandleSuccess();
      if (result && typeof result.errors === 'object') {
        console.log(result);
      } else {
        onHandleSuccess();
      }
    });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const { sheet: {
        classes
      } } = this.props;
    return (
      <div className={classes.partnersContainer}>
        <form onSubmit={handleSubmit((values) => this.handleRegister(values))}>
          <div className={classes.partnersHeader}>
            <h3 className={classes.partnersHeaderTitle}>Pendaftaran Mitra</h3>
            <small>Mohon isi & lengkapi formulir berikut ini untuk pendaftaran sebagai Mitra Pinjam</small>
          </div>

          <Spacer />

          <Field
            name="name"
            component={TextField}
            floatingLabelText="Nama Lengkap Anda"
            ref={(textField) => { this.name = textField; }}
            normalize={letter}
            fullWidth />
          <Field
            name="email"
            component={TextField}
            floatingLabelText="Alamat Email Anda"
            ref={(textField) => { this.email = textField; }}
            fullWidth />
          <Field
            name="companyName"
            component={TextField}
            floatingLabelText="Nama Perusahaan"
            ref={(textField) => { this.companyName = textField; }}
            fullWidth />
          <Field
            name="category"
            component={SelectField}
            floatingLabelText="Kategori Usaha"
            fullWidth>
            {[
              {
                label: 'Emas',
                value: 'emas'
              }, {
                label: 'Sepeda Motor',
                value: 'sepeda-motor'
              }, {
                label: 'Mobil',
                value: 'mobil'
              }, {
                label: 'Laptop',
                value: 'laptop'
              }, {
                label: 'Gadget',
                value: 'gadget'
              }
            ].map((category, idx) => <MenuItem
              key={`category-${idx.id}`}
              value={category.value}
              primaryText={category.label} />)}
          </Field>
          <Field name="companyCity" component={SelectField} floatingLabelText="Kota Perusahaan" fullWidth>
            {[
              {
                label: 'Jakarta',
                value: 'jakarta'
              }, {
                label: 'Bogor',
                value: 'bogor'
              }, {
                label: 'Depok',
                value: 'depok'
              }, {
                label: 'Tangerang',
                value: 'tangerang'
              }, {
                label: 'Bekasi',
                value: 'bekasi'
              }
            ].map((category, idx) => <MenuItem
              key={`city-${idx.id}`}
              value={category.value}
              primaryText={category.label} />)}
          </Field>
          <Field
            name="companyAddress"
            component={TextField}
            floatingLabelText="Alamat Perusahaan"
            ref={(textField) => { this.companyAddress = textField; }}
            fullWidth
            multiLine
            rows={2}
            rowsMax={2} />
          <Field
            name="companyTelephone"
            component={TextField}
            floatingLabelText="Nomor Telepon Perusahaan"
            ref={(textField) => { this.companyTelephone = textField; }}
            normalize={number}
            fullWidth />

          <Spacer />

          <div className={classes.partnersFooter}>
            <Button label="Daftar" type="submit" submitting={submitting} secondary />
          </div>
        </form>
      </div>
    );
  }
}
