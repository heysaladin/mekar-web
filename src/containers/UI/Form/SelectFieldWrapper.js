import React, { Component, PropTypes } from 'react';
import { SelectField } from 'redux-form-material-ui';

export default class SelectFieldWrapper extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    meta: PropTypes.object.isRequired,
    children: PropTypes.array.isRequired
  }
  render() {
    const { input: { value }, onSelect } = this.props;

    if (!this.props.meta.touched) {
      onSelect(value);
    }

    return (
      <SelectField {...this.props}>
        { this.props.children }
      </SelectField>
    );
  }
}
