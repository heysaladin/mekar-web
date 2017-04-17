import React, {Component, PropTypes} from 'react';
import View from 'react-flexbox';
import MenuItem from 'material-ui/MenuItem';
import {Field} from 'redux-form';
import {SelectField} from 'redux-form-material-ui';

import dataDateTime from '../../../data/datetime.json';

class MonthPicker extends Component {

  state = {
    maxHeight: 200
  };

  getMonths = () => {
    return dataDateTime.months;
  };

  getRange = () => {
    const {limit, upTo} = this.props;
    const startDate = new Date();
    let endDate = null;

    // dari tanggal sekarang ke belakang
    if (limit) {
      endDate = new Date(new Date().setFullYear(startDate.getFullYear() - parseInt(limit)));
      return this.iterate(endDate, startDate);
    }

    // dari tanggal sekarang ke depan
    if (upTo) {
      endDate = new Date(new Date().setFullYear(startDate.getFullYear() + parseInt(upTo)));
      return this.iterate(startDate, endDate);
    }
  };

  iterate = (startDate, stopDate) => {
    let dateArray = [];
    let currentDate = startDate;

    while (currentDate <= stopDate) {
      dateArray.push({
        "label": this.getMonths()[currentDate.getMonth()].label + ' ' + currentDate.getFullYear(),
        "value": currentDate.getFullYear() + '-' + this.getMonths()[currentDate.getMonth()].value + '-1' 
      });
      currentDate = this.addMonth(currentDate, 1);
    }

    return dateArray;
  }

  addMonth = (date, interval) => {
    date.setMonth(date.getMonth() + interval);
    return date;
  }

  render() {

    return (
      <div style={style.spaceBottom}>
        <View auto row>
          <View column width="100%">
            <Field {...this.props} component={SelectField} floatingLabelStyle={style.label} maxHeight={this.state.maxHeight} fullWidth>
              {this.getRange().reverse().map((range, i) => <MenuItem key={`purchase-year-${i}`} value={range.value} primaryText={range.label}/>)}
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

MonthPicker.propTypes = {
  name: PropTypes.string,
  floatingLabelText: PropTypes.string,
  limit: PropTypes.any,
  upTo: PropTypes.any
};

export default MonthPicker;
