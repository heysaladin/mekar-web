import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import View from 'react-flexbox';
import MenuItem from 'material-ui/MenuItem';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';

import dataDateTime from '../../../data/datetime.json';

class BirthDatePicker extends Component {

  state = {
    maxHeight: 200
  };

  getYears = () => {
    let years = [];
    const currentYear = new Date().getFullYear() - 17;
    const oldYear = new Date().getFullYear() - 60;

    for (let i = currentYear; i >= oldYear; i--) {
      years.push(i.toString());
    }

    return years;
  };

  getDays = () => {
    let days = [];

    for (let i = 1; i <= 31; i++) {
      days.push(i.toString());
    }

    return days;
  };

  getMonths = () => {
    return dataDateTime.months;
  };

  render() {
    const uiDays = this.getDays().map((day, i) => <MenuItem key={'day' + i} value={day} primaryText={day} />);
    const uiMonths = this.getMonths().map((month, i) => <MenuItem key={'month' + i} value={month.value} primaryText={month.label} />);
    const uiYears = this.getYears().map((year, i) => <MenuItem key={'year' + i} value={year} primaryText={year} />);

    return (
      <div style={style.spaceBottom}>
        <View auto row>
          <View column width="30%">
            <Field name="birthday" component={SelectField} floatingLabelText="Tanggal Lahir" floatingLabelStyle={style.label} maxHeight={this.state.maxHeight} fullWidth>
              {
                this.getDays().map((day, i) => <MenuItem key={`day-${i}`} value={day} primaryText={day} />)
              }
            </Field>
          </View>
          <View column width="30%">
            <Field name="birthmonth" component={SelectField} floatingLabelText="Bulan" floatingLabelStyle={style.label} maxHeight={this.state.maxHeight} fullWidth>
              {
                this.getMonths().map((month, i) => <MenuItem key={`month-${i}`} value={month.value} primaryText={month.label} />)
              }
            </Field>
          </View>
          <View column width="30%">
            <Field name="birthyear" component={SelectField} floatingLabelText="Tahun" floatingLabelStyle={style.label} maxHeight={this.state.maxHeight} fullWidth>
              {
                this.getYears().map((year, i) => <MenuItem key={`year-${i}`} value={year} primaryText={year} />)
              }
            </Field>
          </View>
        </View>
      </div>
    );
  }
}

const style = {
  spaceBottom: {
    marginBottom: 0
  },
  label: {
    left: 0
  }
};

export default BirthDatePicker;
