import React, { Component, PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Helmet from 'react-helmet';
import { currency, category } from 'utils/filter';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import * as appraisalHistoryActions from 'redux/modules/public/appraisalHistory';
import { load as loadAppraisalHistory } from 'redux/modules/public/appraisalHistory';
import * as summaryActions from 'redux/modules/public/summary';
// import { loadSummary } from 'redux/modules/public/summary';
import injectSheet from 'react-jss';

import {
  Container,
  Header,
  Content,
  Spacer,
  Link,
  Button,
  ImageGallery
} from '../../UI';
import noPhoto from '../../Shared/Assets/no_photo.png';

import SearchBox from './SearchBox';
import Summary from './Summary';

import styles from './riwayatTaksiranDetailStyles';
@injectSheet(styles)

@asyncConnect([
  {
    deferred: true,
    promise: ({
      params,
      store: {
        dispatch,
        getState
      }
    }) => {
      const promises = [];
      promises.push(dispatch(loadAppraisalHistory(params)));
      // promises.push(dispatch(loadSummary()));

      return Promise.all(promises);
    }
  }
])
@connect(state => ({ appraisalHistory: state.appraisalHistory.data, summary: state.summary.data, loading: state.appraisalHistory.loading }), {
  ...appraisalHistoryActions,
  ...summaryActions
})

export default class RiwayatTaksiranDetail extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired,
    appraisalHistory: PropTypes.object.isRequired,
    // error: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  handleImageLoad = (event) => {};

  render() {
    const { appraisalHistory, summary, loading, params } = this.props;

    let appraisal = {};
    let summaryData = {};
    if (appraisalHistory) {
      appraisal = appraisalHistory.data;
    }
    if (summary) {
      summaryData = summary.data;
    }

    const { sheet: {
      classes
    } } = this.props;

    return (
      <Container>
        <Helmet title={`Riwayat Taksiran ` + (appraisal.name || '-')} />
        <Spacer />
        <Header primaryText="Taksiran Online Terakhir" />
        <Card>
          <Content className={classes.taksiran}>
            {/** <SearchBox/> */}
            <Spacer />
            <Link to="/riwayat-taksiran">&lt; Kembali</Link>
            <Spacer />
            {appraisal.photos && appraisal.photos.length === 0 && <img src={noPhoto} alt="no-photo" className={classes.images} />}
            {appraisal.photos && appraisal.photos.length > 0 && <ImageGallery items={appraisal.photos} />}

            <Spacer />
            <Spacer />

            <h4 className={classes.noMarginTop}>{appraisal.name || '-'}</h4>
            Kategori : &nbsp;<strong>{category(appraisal.category) || '-'}</strong><br />
            Merek &nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;<strong>{appraisal.merk || '-'}</strong>
            <Spacer />
            <p>
              <strong>Deskripsi Produk</strong><br /><br /> {appraisal.name || '-'}
              <br /><br /> {appraisal.description || '-'}
            </p>
          </Content>
        </Card>
        <Divider />
        <Card>
          <Content>
            <div className={classes.positionRelative}>
              Barang ini ditaksir seharga
              <br />
              <span className={classes.price}>
                <strong>{currency(appraisal.price) || '-'}</strong>
              </span>
              <Spacer />
              <Link to={`/gadai?category=${appraisal.category}&merk=${appraisal.merk}&item=${appraisal.name}`}>
                <Button label="Gadai sekarang" secondary />
              </Link>
            </div>
          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}
