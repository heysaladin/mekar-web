import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
// import { Link } from 'react-router';
/*
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import * as appraisalHistoryActions from 'redux/modules/public/appraisalHistory';
import { load as loadAppraisalHistory } from 'redux/modules/public/appraisalHistory';
// import * as summaryActions from 'redux/modules/public/summary';
// import {loadSummary} from 'redux/modules/public/summary';

import * as appraisalHistoriesActions from 'redux/modules/public/appraisalHistories';

import { reduxForm } from 'redux-form';
*/
import { Link } from 'react-router';
import { MdChevronLeft } from 'react-icons/lib/md';
import listPartners from 'data/branch.json';

import sampleImage from './img/mekar.jpg';

import { Container, Header, Spacer } from '../../UI';
// import { Content } from '../../UI';

import Layout from '../../App/Layout';

const styles = {
  openingArea: {
    background: '#2a6d5e',
    width: '100%',
    height: 150,
    marginTop: -50,
    backgroundImage: 'linear-gradient(120deg,#447f2c 0%,#2a6d5e 100%)'
  },
  verticalLine: {
    display: 'block',
    width: 2,
    height: 25,
    margin: '25px auto 0',
    background: '#6ec8ce',
    position: 'absolute',
    left: 0,
    right: 0
  },
  contentWrapper: {
    margin: '-116px auto 0'
  },
  listWrapper: {
    width: '100%',
    margin: '50px auto',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  gridItem: {
    width: 'auto',
    margin: '8px 0'
  },
  gridCard: {
    width: 640,
    minHeight: 350,
    background: 'white',
    borderRadius: 8,
    boxShadow: '0 0 5px rgba(0,0,0,.25)',
    position: 'relative',
    margin: '126px auto 0'
  },
  gridContentWrapper: {
    width: 252,
    margin: '-126px auto 0',
    position: 'absolute',
    left: 0,
    right: 0
  },
  gridImageWrapper: {
    width: 252,
    height: 252,
    borderRadius: 8,
    overflow: 'hidden'
  },
  gridImage: {
    width: 'auto',
    height: 'inherit',
    margin: '0 auto'
  },
  gridTitle: {
    textAlign: 'center',
    color: '#15904e',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: '15px 0 0'
  },
  gridBodyCopy: {
    textAlign: 'center',
    color: '#ababab',
    fontSize: 12,
    margin: '5px 0'
  },
  buttonBack: {
    color: 'white',
    textDecoration: 'none'
  },
  textCenter: Layout.textCenter
};
/*
@asyncConnect([
  {
    deferred: true,
    promise: ({ params, store: {
        dispatch
      } }) => {
      const promises = [];
      promises.push(dispatch(loadAppraisalHistory(params)));
      // promises.push(dispatch(loadSummary()));

      return Promise.all(promises);
    }
  }
])
@connect(state => ({
  appraisalHistories: state.appraisalHistories.data,
  appraisalHistory: state.appraisalHistory.data,
  // summary: state.summary.data,
  loading: state.appraisalHistories.loading
}), {
  ...appraisalHistoryActions,
  // ...summaryActions,
  ...appraisalHistoriesActions
})

@reduxForm({ form: 'formAppraisalHistory', formKey: 'formAppraisalHistory' })
*/
@injectSheet(styles)

export default class Details extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    // data: PropTypes.array.isRequired,
    // load: PropTypes.func.isRequired,
    // appraisalHistory: PropTypes.object.isRequired,
    // appraisalHistories: PropTypes.object.isRequired,
    // error: PropTypes.string.isRequired,
    // loading: PropTypes.bool.isRequired,
  }

  state = {
    branchPartnersState: listPartners.branchs,
    appraisalHistories: []
  }

  /**
   * Mendapatkan data dari file data/branch.json dan merubah isinya menjadi array of object
   *
   * @returns {object}
   * @memberOf PartnersAddress
   */
  getPartners = () => {
    const partners = [];
    let idx = 0;

    const url = window.location.pathname;
    const splitUrl = url.split('/');
    const lastSegment = splitUrl[splitUrl.length - 1];

    this
      .state
      .branchPartnersState
      .map((branch) => {
        if (branch.visible !== false && branch.id === parseInt(lastSegment, 10)) {
          console.log(lastSegment);
          console.log(branch.id);
          ++idx;
          branch.number = idx;
          partners.push(branch);
        }
        return branch;
      });

    return partners;
  }

  render() {
    const {
        sheet: {
            classes
        },
        // appraisalHistories,
        // appraisalHistory,
    } = this.props;

    // let appraisal = {};
    // if (appraisalHistory) {
    //   appraisal = appraisalHistory.data;
    // }

    // let appraisals = [];
    // if (appraisalHistories) {
    //   if (this.state.appraisalSearch === true) {
    //     appraisals = appraisalHistories.data;
    //   } else {
    //     appraisals = [];
    //   }
    // }
    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container style={styles.contentWrapper}>
          <Helmet
            title="Some Title of Details" />
          <Spacer />
          <Header primaryText="Some Title of Details" />
          <span className={classes.verticalLine}></span>
          <div>
            <div style={styles.buttonBack}>
              <Link style={styles.buttonBack} to="/inner"><MdChevronLeft />Kembali</Link>
            </div>
            {this
            .getPartners()
            .length > 0 && <div className={classes.listWrapper}>
              {this
                .getPartners()
                .map(
                  (mitra) => <div key={`mitra-${mitra.number}`} className={classes.gridItem}>
                    <div className={classes.gridCard}>
                      <div className={classes.gridContentWrapper}>
                        <div className={classes.gridImageWrapper}>
                          <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                        </div>
                        <h4 className={classes.gridTitle}>{mitra.name}</h4>
                        <p className={classes.gridBodyCopy}>{mitra.telephone}</p>
                      </div>
                    </div>
                  </div>
                  )
              }
            </div>}
            {/* {this
              .getPartners()
              .length === 0 && <Content className={classes.textCenter}>
                <h4>Nama toko atau alamat yang Anda cari belum ada.<br /> Mohon cari dengan kata kunci lain</h4>
              </Content>
            }*/}
          </div>
          <Spacer />
        </Container>
      </div>
    );
  }
}
