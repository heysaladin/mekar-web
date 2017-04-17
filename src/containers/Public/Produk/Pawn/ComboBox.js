import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class ComboBox extends Component {
  render() {

    const { value, onChange } = this.props;

    return (
      <div>
        <SelectField
          value={value}
          onChange={onChange}
          />
      </div>
    );
  }
}
