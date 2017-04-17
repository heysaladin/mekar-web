import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import { SelectField, TextField } from 'redux-form-material-ui';
import IconButton from 'material-ui/IconButton';
import { createValidator, required, lessThan } from 'utils/validation';
import { float } from 'utils/masking';
import { slugify } from 'utils/filter';

import Layout from '../../../App/Layout';
import { Spacer, Button } from '../../../UI';

import iconCategory from './Assets/ic-emas.svg';

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
  },
  buttonGadaiLabel: {
    fontSize: Layout.fontSize,
    textAlign: 'center',
    marginTop: Layout.marginSmall
  }
};

@reduxForm({
  form: 'formJewelry',
  formKey: 'formJewelry',
  validate: createValidator({
    bruto: [required],
    netto: [required, lessThan('bruto', 'Berat Kotor')],
    purity: [required]
  })
})

export default class FormJewelry extends Component {

  state = {
    categoryType: 'logam-mulia',
    total: 0
  };

  handleChangeType = (value) => {
    if (!value) {
      return;
    }

    setTimeout(() => {
      this.setState({ categoryType: value });
    }, 100);
  };

  handleTotal = (value) => {
    if (!value) {
      return;
    }

    setTimeout(() => {
      this.setState({ total: value });
    }, 100);
  };

  handleSubmit = (values) => {
    const { onSubmit } = this.props;

    values.type = 'perhiasan';

    return onSubmit(values);
  }

  renderSelectField = (options) => {
    if (typeof options === 'undefined' || options === null) {
      return;
    }

    const ui = [];
    options.forEach((option, idx) => {
      const label = (option.name)
        ? option.name
        : option.label;
      ui.push(<MenuItem
        value={option.value}
        key={`${option.label}-${option.value}-${idx}`}
        primaryText={label} />);
    });

    return ui;
  }

  render() {
    const {
      selectedCategory,
      formData,
      handleSubmit,
      submitting,
      onBack
    } = this.props;

    return (
      <div style={style.wrap}>
        <form onSubmit={handleSubmit((values) => this.handleSubmit(values))}>
          <div style={style.textCenter}>
            <IconButton key={1} style={style.buttonGadai}>
              <img src={iconCategory} alt={'category'} />
              <div style={style.buttonGadaiLabel}>{selectedCategory.label}</div>
            </IconButton>
          </div>
          <div>
            {/* 2 */}
            <Field
              name="bruto"
              component={TextField}
              type="tel"
              floatingLabelText="Berat Kotor (gram)"
              hintText="Contoh: 1 atau 1.5"
              ref="bruto"
              normalize={float}
              fullWidth />
            <Field
              name="netto"
              component={TextField}
              type="tel"
              floatingLabelText="Berat Bersih (gram)"
              hintText="Contoh: 1 atau 1.5"
              ref="netto"
              normalize={float}
              fullWidth />
            <Field
              name="purity"
              component={SelectField}
              floatingLabelText="Kadar"
              fullWidth>
              {this.renderSelectField(formData.gold.carat)}
            </Field>
          </div>
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

FormJewelry.propTypes = {
  initialize: PropTypes.func,
  dispatch: PropTypes.func,
  selectedCategory: PropTypes.object,
  formData: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  onBack: PropTypes.func,
  values: PropTypes.object,
  validateSelectedItem: PropTypes.func,
  selectedItem: PropTypes.object,
  onSubmit: PropTypes.func
};
