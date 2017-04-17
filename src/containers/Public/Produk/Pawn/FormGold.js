import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import MenuItem from 'material-ui/MenuItem';
import { TextField } from 'redux-form-material-ui';
import IconButton from 'material-ui/IconButton';
import { createValidator, required } from 'utils/validation';
import { float } from 'utils/masking';
import { slugify } from 'utils/filter';

import Layout from '../../../App/Layout';
import { Spacer, Button } from '../../../UI';
import SelectFieldWrapper from '../../../UI/Form/SelectFieldWrapper';

import iconCategory from './Assets/ic-logam-mulia.svg';

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
  form: 'formGold',
  formKey: 'formGold',
  validate: createValidator({
    weight_0: [required],
    weight_1: [required],
    weight_2: [required],
    weight_3: [required],
    weight_4: [required]
  })
})

export default class FormGold extends Component {

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
    const weight = [];

    for (const key in values) {
      if (key.indexOf('weight_') === 0) {
        weight.push(values[key]);
      }
    }

    values.weight = weight;

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

  renderTextField = (total) => {
    const ui = [];

    for (let index = 0; index < total; index++) {
      ui.push(<Field
        key={`total-${index}`}
        type="tel"
        name={`weight_${index}`}
        component={TextField}
        floatingLabelText={`Berat ${index + 1} (gram)`}
        hintText="Contoh: 1 atau 1.5"
        normalize={float}
        fullWidth />);
    }

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
            <Field
              name="total"
              component={SelectFieldWrapper}
              onSelect={this.handleTotal}
              floatingLabelText="Jumlah Keping"
              fullWidth>
              {this.renderSelectField(formData.gold.totals)}
            </Field>
            {this.state.total > 0 && <div>
              {this.renderTextField(this.state.total)}
            </div>}
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

FormGold.propTypes = {
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
