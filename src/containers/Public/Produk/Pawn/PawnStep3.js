import React, { Component, PropTypes } from 'react';
import View from 'react-flexbox';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pawnSimulateActions from 'redux/modules/product/pawn/simulate';
import { currency } from 'utils/filter';
import { slugify, date } from 'utils/filter';
import { currency as maskCurrency } from 'utils/masking';

import { Spacer, Button, Loader } from '../../../UI';
import duration from '../../../../data/pawn/duration.json';
import Layout from '../../../App/Layout';
import Theme from '../../../App/Theme';


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
  },
  positionRelative: {
    position: 'relative'
  },
  back: {
    color: Layout.textColor,
    marginRight: 5,
    fontWeight: 'bold',
    textDecoration: 'none',
    position: 'absolute',
    right: 8,
    top: 0
  },
  wrap: {
    padding: '0px 0px',
    textAlign: 'center'
  },

  note: {
    textAlign: 'left'
  },
  noteItalic: {
    fontStyle: 'italic',
  },

  rateRange: {
    color: '#ED402F',
    fontSize: 20
  },
  sliderWrapper: {
    position: 'relative',
    height: 50
  },
  sliderSpace: {
    marginTop: -20
  },
  error: {
    color: 'white',
    background: Theme.secondaryColor,
    borderRadius: 3,
    padding: 3
  },
  simulatePriceResult: {
    height: 250,
    display: 'flex',
    flexFlow: 'column nowrap',
    flex: '0 0 auto',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'stretch',
  },
  noteBold: {
    textAlign: 'left',
    fontWeight: 'bold'
  },
  squareInput: {
    border: 'solid 1px #aaa',
    borderRadius: 2,
    padding: '5px 7px',
    margin: '0 8px',
    textAlign: 'center'
  },
  moneyBold: {
    textAlign: 'right',
    fontWeight: 'bold'
  }
};

@connect(state => ({ simulateError: state.pawnSimulate.simulateError }), dispatch => bindActionCreators(pawnSimulateActions, dispatch))

export default class PawnStep3 extends Component {

  state = {
    slider: 4,
    loanAmount: null,
    simulationId: null,
    appraisalBottomPrice: null,
    appraisalTopPrice: null,
    dataResult: null,
    error: false
  };

  componentWillMount = () => {
    const { data } = this.props;
    this.handleAmountOnChange(null, data.appraisalTopPrice);
    this.setState({ simulationId: data.simulationId });
  }

  componentDidMount(values) {
    const postValues = {
      ...values,
      id: this.state.simulationId,
      fundNeeded: this
        .refs
        .loanamount
        .getValue(),
      duration: this.state.slider
    };

    return this.calculateSimulationPrice(postValues);
  }

  calculateSimulationPrice = (values) => {
    const { pawn } = this.props;

    values.fundNeeded = this.cleanUp(values.fundNeeded.toString());

    return pawn(values).then(result => {
      if (result && typeof result.errors === 'object') {
        // console.log(result);
      } else {
        this.setState({ dataResult: result });
      }
    });
  }

  handleSlider = (event, value) => {
    this.setState({ slider: value });
  };

  handleAmountOnChange = (event, inputAmount) => {
    const { data } = this.props;

    this.setState({ appraisalTopPrice: maskCurrency(inputAmount) });

    let rawValue = maskCurrency(inputAmount);

    rawValue = this.cleanUp(rawValue);

    if (rawValue < 250000 || rawValue > parseInt(data.appraisalTopPrice, 10)) {
      this.setState({ error: true });
      rawValue = 0;
    } else {
      this.setState({ error: false });
    }

    const postValues = {
      id: this.state.simulationId,
      fundNeeded: rawValue,
      duration: this.state.slider
    };

    return this.calculateSimulationPrice(postValues);
  };

  cleanUp = (value) => {
    if (!value || typeof value !== 'undefined') return `${value}`.replace(/\./g, '');
  };

  handleSliderOnDragStop = (event, values) => {
    const postValues = {
      ...values,
      id: this.state.simulationId,
      fundNeeded: this
        .refs
        .loanamount
        .getValue(),
      duration: this.state.slider
    };

    return this.calculateSimulationPrice(postValues);
  }

  render() {
    const { data, category, onHandleReset, onHandleNext } = this.props;
    const { appraisalTopPrice } = this.state;

    return (
      <div style={style.positionRelative}>
        <div style={style.textTitle}>Hasil taksiran online</div>
        <br />
        <div style={style.wrap}>
          <p style={style.textCenter}>
            Barang Anda Kami Taksir Seharga:
          </p>
          {data.appraisalBottomPrice === data.appraisalTopPrice && <h1 style={style.rateRange}>{currency(data.appraisalBottomPrice) || '-'}</h1>}
          {data.appraisalBottomPrice !== data.appraisalTopPrice && <div>
            <h1 style={style.rateRange}>{currency(data.appraisalBottomPrice) || '-'}</h1>
            sampai<br />
            <h1 style={style.rateRange}>{currency(data.appraisalTopPrice) || '-'}</h1>
          </div>}
          <p style={style.noteItalic}>*) Harga dapat berubah bergantung pada kondisi dan kelengkapan barang.</p>
          {/* ==== */}
          <Spacer />
          <Spacer />
          <span style={style.textTitle}>
            Simulasi Taksiran Online
          </span>
          <TextField
            name="loanamount"
            ref="loanamount"
            hintText="Jumlah Pinjaman"
            floatingLabelText="Jumlah Pinjaman"
            type="text"
            fullWidth
            value={appraisalTopPrice}
            onChange={this.handleAmountOnChange} />
          {this.state.error && <div
            style={style.error}>
            Nilai pinjaman dimulai dari 250 ribu hingga {maskCurrency(data.appraisalTopPrice)}
            &nbsp;juta rupiah
          </div>}

          <p style={style.note}>
            Lama Pinjaman
          </p>
          <View auto row>
            <View column width="85%">
              <div style={style.sliderWrapper}>
                <Slider
                  min={0}
                  max={(duration.weekly.length)}
                  step={1}
                  defaultValue={4}
                  value={this.state.slider}
                  onChange={this.handleSlider}
                  style={style.sliderSpace}
                  onDragStop={this.handleSliderOnDragStop} />
              </div>
            </View>
            <View column width="15%" style={style.viewFlex}>
              {this.state.slider}<br />Minggu
            </View>
          </View>
          <span style={style.noteItalic}>Jatuh tempo tanggal {this.state.dataResult && date(this.state.dataResult.data.dueDate)}</span>
          <Spacer />
          {!data && <Loader label="Menghitung simulasi..." />}
          {data && <div style={style.simulatePriceResult}>
            <Divider />
            <View auto row>
              <View column width="60%">
                <span style={style.note}>
                  Jumlah pinjaman
                </span>
              </View>
              <View column width="40%">
                <span style={style.moneyBold}>
                  {this.state.dataResult && currency(this.state.dataResult.data.loanAmount)}
                </span>
              </View>
            </View>
            <Divider />
            <View auto row>
              <View column width="60%">
                <span style={style.note}>
                  Biaya Asuransi (0,1%)
                </span>
              </View>
              <View column width="40%">
                <span style={style.moneyBold}>
                  {this.state.dataResult && currency(this.state.dataResult.data.costInsurance)}
                </span>
              </View>
            </View>
            <View auto row>
              <View column width="60%">
                <span style={style.note}>
                  Biaya Materai
                </span>
              </View>
              <View column width="40%">
                <span style={style.moneyBold}>
                  {this.state.dataResult && currency(this.state.dataResult.data.costStamp)}
                </span>
              </View>
            </View>
            <View auto row>
              <View column width="60%">
                <span style={style.note}>
                  Biaya Sewa Modal (0,7% per minggu)
                </span>
              </View>
              <View column width="40%">
                <span style={style.moneyBold}>
                  {this.state.dataResult && currency(this.state.dataResult.data.costRental)}
                </span>
              </View>
            </View>
            <Divider />
            <View auto row>
              <View column width="60%">
                <span style={style.note}>
                  Uang yang diterima
                </span>
              </View>
              <View column width="40%">
                <span style={style.moneyBold}>
                  {this.state.dataResult && currency(this.state.dataResult.data.fundReceive)}
                </span>
              </View>
            </View>
            <Divider />
            <View auto row>
              <View column width="60%">
                <span style={style.note}>
                  Uang yang dibayarkan pada {this.state.dataResult && date(this.state.dataResult.data.dueDate)}
                </span>
              </View>
              <View column width="40%">
                <span style={style.moneyBold}>
                  {this.state.dataResult && currency(this.state.dataResult.data.fundPaid)}
                </span>
              </View>
            </View>
            <Divider />
          </div>}
          {/* ==== */}
          <Spacer />
          <p>
            Apakah anda setuju dengan penawaran kami dan ingin mengajukan gadai ?
          </p>
          <Spacer />
          <div>
            <Button label="Ajukan Gadai" fullWidth secondary onTouchTap={onHandleNext} id={`pawn-simulation-${slugify(category.label)}-submit`} />
            <br /><br /> {/*
            <Button label="Kembali" onTouchTap={onHandlePrev}/>
            <br/><br/>
            */}
            <Button label="Taksir Barang lain" fullWidth onTouchTap={onHandleReset} id={`pawn-simulation-${slugify(category.label)}-tryother`} />
          </div>
        </div>
      </div>
    );
  }
}

PawnStep3.propTypes = {
  simulation: PropTypes.func,
  pawn: PropTypes.func,
  category: PropTypes.object,
  data: PropTypes.object,
  onHandleNext: PropTypes.func,
  onHandlePrev: PropTypes.func,
  onHandleReset: PropTypes.func
};
