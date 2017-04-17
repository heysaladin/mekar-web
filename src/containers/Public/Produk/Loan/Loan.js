import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Card } from 'material-ui/Card';
import Helmet from 'react-helmet';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loanFilingActions from 'redux/modules/product/loan/filing';
import { prepareDate } from 'utils/filter';
import injectSheet from 'react-jss';

import { Container, Content, Spacer } from '../../../UI';
import LoanBusiness from './LoanBusiness';
// import LoanFactoring from './LoanFactoring';
import LoanEmployee from './LoanEmployee';

import styles from './loanStyles';
@injectSheet(styles)

@connect(state => ({ filingError: state.pawnSimulate.filingError }), dispatch => bindActionCreators(loanFilingActions, dispatch))

export default class Loan extends Component {

  static propTypes = {
    filing: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  handleSubmit = (values) => {
    const { filing } = this.props;

    if (values.callTime) {
      values.callTime = prepareDate(values.callTime);
    }

    return filing(values).then(result => {
      if (result && typeof result.errors === 'object') {
        console.log(result);
      } else {
        browserHistory.push('/pinjaman/berhasil');
      }
    });
  }

  render() {
    const { sheet: {
        classes
      } } = this.props;
    return (
      <Container>
        <Helmet title="Pinjaman" />
        <Helmet
          title="Pinjaman" />
        <Spacer />
        <Card>
          <Content className={classes.noPadding}>
            <Tabs tabItemContainerStyle={styles.tabs}>
              <Tab id="loan-business-tab-start" label="Usaha" className={classes.tab}>
                <div className={classes.wrap}>
                  <LoanBusiness onSubmit={this.handleSubmit} />
                </div>
              </Tab>
              {/**
              <Tab label="Talangan" className={classes.tab}>
                <div className={classes.wrap}>
                  <LoanFactoring onSubmit={this.handleSubmit}/>
                </div>
              </Tab>
              */}
              <Tab id="loan-employee-tab-start" label="Karyawan" className={classes.tab}>
                <div className={classes.wrap}>
                  <LoanEmployee onSubmit={this.handleSubmit} />
                </div>
              </Tab>
            </Tabs>
          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}
