import React, { Component, PropTypes } from 'react';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import injectSheet from 'react-jss';

import { Spacer } from '../../../UI';
import dataConstant from '../../../../data/constant.json';

import LoanFactoringWorkReceiver from './LoanFactoringWorkReceiver';
import LoanFactoringWorkGiver from './LoanFactoringWorkGiver';

import styles from './loanFactoringStyles';
@injectSheet(styles)

export default class LoanFactoring extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired
  }

  state = {
    data: null,
    stepIndex: 0
  }


  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  scrollToTop = () => {
    window.scrollTo(0, 0);
  }

  handleStep1 = (dataWorkReceiver) => {
    this.scrollToTop();

    this.setState({ stepIndex: 1, data: dataWorkReceiver });
  }

  handleStep2 = (dataWorkGiver) => {
    const { data } = this.state;
    const { onSubmit } = this.props;

    const values = Object.assign(data, dataWorkGiver);
    values.type = dataConstant.LOAN_FACTORING;

    return onSubmit(values);
  }

  handleStepReset = () => {
    this.scrollToTop();
    this.setState({ stepIndex: 0 });
  }

  render() {
    const { stepIndex } = this.state;
    const { sheet: {
        classes
      } } = this.props;
    return (
      <div className={classes.textCenter}>
        <h4>Pinjam Talangan</h4>
        <div>Manfaatkan produk Pinjaman Talangan dari Pinjam.co.id sebagai solusi
          pembiayaan anda. Dengan menjaminkan invoice/tagihan dari proses bisnis anda,
          Anda bisa mendapatkan pinjaman dengan bunga rendah yang dibayarkan oleh yang
          meminjam dan limit nilai pinjaman mencapai 500 juta rupiah dalam satu
          invoice/nota tagihan untuk melancarkan arus kas anda. Silahkan isi formulir
          dibawah ini dan operasional kami akan segera menghubungi anda.</div>
        <Spacer />
        <div>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel className={classes.langkahLabel}>Data Penerima Kerja</StepLabel>
            </Step>
            <Step>
              <StepLabel className={classes.langkahLabel}>Data Pemberi Kerja</StepLabel>
            </Step>
          </Stepper>
          <Spacer />
          <div>
            {/* Data Penerima Kerja */}
            {stepIndex === 0 && <LoanFactoringWorkReceiver handleNext={this.handleStep1} />}

            {/* Data Pemberi Kerja */}
            {stepIndex === 1 && <LoanFactoringWorkGiver
              handleNext={this.handleStep2}
              handlePrev={this.handleStepReset} />}
          </div>
        </div>

        <Spacer />
        <Spacer />
      </div>
    );
  }
}
