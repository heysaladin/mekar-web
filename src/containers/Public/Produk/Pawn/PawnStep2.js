import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pawnSimulateActions from 'redux/modules/product/pawn/simulate';

import FormJewelry from './FormJewelry';
import FormGold from './FormGold';
import FormMotorCycle from './FormMotorCycle';
import FormLaptop from './FormLaptop';
import FormHandphone from './FormHandphone';
import FormCamera from './FormCamera';
import FormTabletPC from './FormTabletPC';
import FormCar from './FormCar';
import dataConstant from '../../../../data/constant.json';

const style = {
  textUppercase: {
    textTransform: 'uppercase'
  },
  textCenter: {
    textAlign: 'center'
  },
  textTitle: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontWeight: 500
  }
};

@connect(state => ({ simulateError: state.pawnSimulate.simulateError }), dispatch => bindActionCreators(pawnSimulateActions, dispatch))

export default class PawnStep2 extends Component {

  state = {
    category: null
  }

  handleNext = (values) => {
    const { simulate, category, onHandleNext } = this.props;

    values.category = category.value;

    if (values.price) {
      values.price = values.price.replace(/\./gi, '');
    }

    return simulate(values).then(result => {
      if (result && typeof result.errors === 'object') {
        console.log(result);
      } else {
        sessionStorage.setItem('filing', JSON.stringify({ simulationId: result.data.simulationId }));
        onHandleNext(result.data);
      }
    });
  }

  render() {
    const { onHandlePrev, category, data, paramsSelectedItem, validateSelectedItem } = this.props;

    return (
      <div>
        <div style={style.textTitle}>Jelaskan kondisi barang jaminan anda</div>
        {(() => {
          switch (category.value) {
            case dataConstant.PAWN_CATEGORY_JEWELRY:
              return <FormJewelry formData={data} validateSelectedItem={validateSelectedItem} selectedCategory={category} selectedItem={paramsSelectedItem} onSubmit={this.handleNext} onBack={onHandlePrev} />;
            case dataConstant.PAWN_CATEGORY_GOLD:
              return <FormGold formData={data} validateSelectedItem={validateSelectedItem} selectedCategory={category} selectedItem={paramsSelectedItem} onSubmit={this.handleNext} onBack={onHandlePrev} />;
            case dataConstant.PAWN_CATEGORY_MOTORCYCLE:
              return <FormMotorCycle formData={data} validateSelectedItem={validateSelectedItem} selectedCategory={category} selectedItem={paramsSelectedItem} onSubmit={this.handleNext} onBack={onHandlePrev} />;
            case dataConstant.PAWN_CATEGORY_LAPTOP:
              return <FormLaptop formData={data} validateSelectedItem={validateSelectedItem} selectedCategory={category} selectedItem={paramsSelectedItem} onSubmit={this.handleNext} onBack={onHandlePrev} />;
            case dataConstant.PAWN_CATEGORY_HANDPHONE:
              return <FormHandphone formData={data} validateSelectedItem={validateSelectedItem} selectedCategory={category} selectedItem={paramsSelectedItem} onSubmit={this.handleNext} onBack={onHandlePrev} />;
            case dataConstant.PAWN_CATEGORY_CAMERA:
              return <FormCamera formData={data} validateSelectedItem={validateSelectedItem} selectedCategory={category} selectedItem={paramsSelectedItem} onSubmit={this.handleNext} onBack={onHandlePrev} />;
            case dataConstant.PAWN_CATEGORY_TABLETPC:
              return <FormTabletPC formData={data} validateSelectedItem={validateSelectedItem} selectedCategory={category} selectedItem={paramsSelectedItem} onSubmit={this.handleNext} onBack={onHandlePrev} />;
            case dataConstant.PAWN_CATEGORY_CAR:
              return <FormCar formData={data} validateSelectedItem={validateSelectedItem} selectedCategory={category} selectedItem={paramsSelectedItem} onSubmit={this.handleNext} onBack={onHandlePrev} />;
            default:
              return 'Jenis barang tidak dikenali';
          }
        })()}
      </div>
    );
  }
}

PawnStep2.propTypes = {
  data: PropTypes.object,
  category: PropTypes.object,
  simulate: PropTypes.func,
  onHandleNext: PropTypes.func,
  onHandlePrev: PropTypes.func,
  validateSelectedItem: PropTypes.func,
  paramsSelectedItem: PropTypes.object
};
