import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import { SelectField, TextField } from 'redux-form-material-ui';
import IconButton from 'material-ui/IconButton';
import { createValidator, required, minLength } from 'utils/validation';
import { currency, number } from 'utils/masking';
import { slugify } from 'utils/filter';

import Layout from '../../../App/Layout';
import { Spacer, Button } from '../../../UI';
import MonthPicker from '../../../UI/Form/MonthPicker';
import SelectFieldWrapper from '../../../UI/Form/SelectFieldWrapper';

import iconCategory from './Assets/ic-sepeda-motor.svg';

const style = {
  positionRelative: {
    position: 'relative'
  },
  textCenter: {
    textAlign: 'center'
  },
  wrap: {
    textAlign: 'left',
    paddingLeft: Layout.margin,
    paddingRight: Layout.margin
  },
  buttons: {
    position: 'relative',
    textAlign: 'center'
  },
  buttonGadai: {
    width: 120,
    height: 120,
    padding: 12,
    fontSize: Layout.fontSize,
    textAlign: 'center',
    margin: '10px auto'
  }
};

@reduxForm({
  form: 'formMotorCycle',
  formKey: 'formMotorCycle',
  validate: createValidator({
    merk: [required],
    type: [required],
    color: [required],
    capacity: [
      required, minLength(3)
    ],
    year: [required],
    price: [required],
    validityPeriod: [required]
  })
})

export default class FormMotorCycle extends Component {

  state = {
    merk: null
  };

  handleChangeMerk = (value) => {
    const { dispatch } = this.props;

    setTimeout(() => {
      if (value) {
        this.setState({ merk: value });
        dispatch(change('formMotorCycle', 'type', null));
      }
    }, 100);
  };

  renderSelectField = (options) => {
    if (typeof options === 'undefined' || options === null) {
      return;
    }

    const ui = [];
    options.forEach((option, idx) => {
      const label = (option.name)
        ? option.name
        : option.label;
      ui.push(<MenuItem value={option.value} key={`${option.label}-${option.value}-${idx}`} primaryText={label}/>);
    });

    return ui;
  }

  render() {
    const { merk } = this.state;
    const {
      selectedCategory,
      formData,
      handleSubmit,
      submitting,
      onBack
    } = this.props;
    const filteredItems = [];

    const getItemsByCategory = (category) => {
      if (!formData.items) {
        return;
      }

      formData.items.forEach((items) => {
        if (items.category === category) {
          filteredItems.push(items);
        }
      });

      return filteredItems;
    };

    const getItemsByMerk = (selectedMerk) => {
      let selectedItems = [];

      filteredItems.forEach((items) => {
        if (items.value === selectedMerk) {
          selectedItems = items.items;
        }
      });

      return selectedItems;
    };

    return (
      <div style={style.wrap}>
        <form onSubmit={handleSubmit}>
          <div style={style.textCenter}>
            <IconButton key={1} style={style.buttonGadai}>
              <img src={iconCategory} alt={'category'} />
              <div style={style.buttonGadaiLabel}>{selectedCategory.label}</div>
            </IconButton>
          </div>
          <Field name="merk" component={SelectFieldWrapper} onSelect={this.handleChangeMerk} floatingLabelText="Merk" maxHeight={200} fullWidth>
            {this.renderSelectField(getItemsByCategory(selectedCategory.value))}
          </Field>
          <Field name="type" component={SelectField} floatingLabelText="Tipe" maxHeight={200} fullWidth>
            {this.renderSelectField(getItemsByMerk(merk))}
          </Field>
          <Field name="color" component={SelectField} floatingLabelText="Warna" maxHeight={200} fullWidth>
            {this.renderSelectField(formData.colors)}
          </Field>
          <Field name="capacity" component={TextField} floatingLabelText="Kapasitas Mesin (CC)" ref="capacity" normalize={number} fullWidth />
          <MonthPicker name="year" floatingLabelText="Tahun Pembelian" limit={selectedCategory.rules.economicAge} />
          <Field name="price" component={TextField} floatingLabelText="Harga Beli" normalize={currency} ref="price" fullWidth />
          <MonthPicker name="validityPeriod" floatingLabelText="Masa Berlaku STNK" upTo={selectedCategory.rules.validityPeriod} />
          <Spacer />
          <div style={style.buttons}>
            <Button id={`pawn-simulation-${slugify(selectedCategory.label)}-getresult`} label="Lanjutkan" type="submit" submitting={submitting} secondary />
            <br /><br />
            <Button label="Kembali" submittingHide={submitting} onTouchTap={onBack} />
          </div>
        </form>
      </div>
    );
  }
}

FormMotorCycle.propTypes = {
  initialize: PropTypes.func,
  dispatch: PropTypes.func,
  selectedCategory: PropTypes.object,
  formData: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  onBack: PropTypes.func,
  validateSelectedItem: PropTypes.func,
  selectedItem: PropTypes.object
};
