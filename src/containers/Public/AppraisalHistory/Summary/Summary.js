/*import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import Card from 'material-ui/Card/Card';
import Divider from 'material-ui/Divider';

import { currency } from 'utils/filter';


import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import * as summaryActions from 'redux/modules/public/summary';

import { Content } from '../../../UI';

import styles from './summaryStyles';

const { loadSummary } = summaryActions;

@injectSheet(styles)
@asyncConnect([
  {
    deferred: true,
    promise: ({ store: {
        dispatch
      } }) => {
      const promises = [];
      promises.push(dispatch(loadSummary()));

      return Promise.all(promises);
    }
  }
])
@connect(state => ({ summary: state.summary.data, loading: state.summary.loading }), {
  ...summaryActions
})
class Summary extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    data: PropTypes.object
  };

  static defaultProps = {
    data: {}
  };

  render() {
    const { sheet: {
        classes
      }, data } = this.props;

    return (
      <Card>
        <Content className={classes.wrap}>
          <h1 className={classes.title}>{currency(data.totalLoanDisbursed) || '-'}</h1>
          <span>Total Pinjaman</span>

          <Divider style={styles.divider} />

          <h1 className={classes.title}>{data.totalLoan || '-'}</h1>
          <span>Total Transaksi</span>

          <Divider style={styles.divider} />

          <h1 className={classes.title}>{data.totalMembers || '-'}</h1>
          <span>Total Anggota</span>
        </Content>
      </Card>
    );
  }
}

export default Summary;*/
