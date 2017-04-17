import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { gold } from 'utils/filter';

import Layout from '../../../App/Layout';
import { BPISpacer } from '../../../UI';

import iconCategory from './Assets/ic-logam-mulia.svg';

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

  populateData = (data) => {
    const weight = [];

    for (const key in data) {
      if (key.indexOf('weight_') === 0) {
        if (data[key].length > 0) {
          weight.push(data[key]);
        }
      }
    }

    data.weight = weight;
    data.weightTotal = weight.reduce((aNumber, bNumber) => parseFloat(aNumber) + parseFloat(bNumber), 0);

    return data;
  }

  render() {
    const { data } = this.props;

    let info = {};

    if (data) {
      info = this.populateData(data);
    }

    return (
      <div>
        <div style={style.positionRelative}>
          <div style={style.textCenter}>
            <IconButton key={1} style={style.buttonGadai}>
              <img src={iconCategory} alt={'category'} />
              <div style={style.buttonGadaiLabel}>Logam Mulia</div>
            </IconButton>
          </div>
        </div>
        <BPISpacer />
        Jumlah<br />
        <strong>{info.weight.length || '-'} Keping</strong>
        <BPISpacer />
        Berat<br />
        {
          info.weight.map((wg, index) => <div key={index}>
            <strong>{wg} gram</strong>
          </div>)
        }
        <BPISpacer />
        Berat Total<br />
        <strong>{parseFloat(info.weightTotal).toFixed(2) || '-'} gram</strong>
      </div>
    );
  }
}
