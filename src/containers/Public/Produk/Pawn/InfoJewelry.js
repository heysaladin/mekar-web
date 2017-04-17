import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { gold } from 'utils/filter';

import Layout from '../../../App/Layout';
import { Spacer } from '../../../UI';

import iconCategory from './Assets/ic-emas.svg';

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

export default class InfoGold extends Component {

  render() {
    const { data } = this.props;

    return (
      <div>
        <div style={style.positionRelative}>
          <div style={style.textCenter}>
            <IconButton key={1} style={style.buttonGadai}>
              <img src={iconCategory} alt={'category'} />
              <div style={style.buttonGadaiLabel}>Perhiasan Emas</div>
            </IconButton>
          </div>
        </div>
        <Spacer />
        Berat Kotor<br />
        <strong>{data.bruto || '-'} gram</strong>
        <Spacer />
        Berat Bersih<br />
        <strong>{data.netto || '-'} gram</strong>
        <Spacer />
        Kadar<br />
        <strong>{data.purity || '-'} karat</strong>
        <Spacer />
      </div>
    );
  }
}
