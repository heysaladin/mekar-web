import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { color, date, currency } from 'utils/filter';

import Layout from '../../../App/Layout';
import { Spacer } from '../../../UI';

import iconCategory from './Assets/ic-kamera.svg';

const style = {
  positionRelative: {
    position: 'relative'
  },
  textCenter: {
    textAlign: 'center'
  },
  buttonGadai: {
    width: 120,
    height: 120,
    padding: 12
  },
  buttonGadaiLabel: {
    fontSize: Layout.fontSize,
    textAlign: 'center',
    marginTop: Layout.marginSmall
  }
};

export default class InfoCamera extends Component {

  render() {
    const { data } = this.props;

    return (
      <div>
        <div style={style.positionRelative}>
          <div style={style.textCenter}>
            <IconButton key={1} style={style.buttonGadai}>
              <img src={iconCategory} alt={'category'} />
              <div style={style.buttonGadaiLabel}>Kamera</div>
            </IconButton>
          </div>
        </div>
        <Spacer />
        Merek<br />
        <strong>{data.merk || '-'}</strong>
        <Spacer />
        Tipe<br />
        <strong>{data.type || '-'}</strong>
        <Spacer />
        Tahun Pembelian<br />
        <strong>{date(data.year, true) || '-'}</strong>
        <Spacer />
        Harga Beli<br />
        <strong>{currency(data.price) || '-'}</strong>
        <Spacer />
        Kelengkapan Lain<br />
        <strong>{data.completeness || '-'}</strong>
        <Spacer />
      </div>
    );
  }
}
