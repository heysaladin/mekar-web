import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
// import Card from 'material-ui/Card/Card';
import { Link } from 'react-router';

// import injectSheet from 'react-jss';
// import Card from 'material-ui/Card/Card';
// import Helmet from 'react-helmet';
// import Paper from 'material-ui/Paper';
// import MenuItem from 'material-ui/MenuItem';

import {
  // Field,
  reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import * as appraisalHistoriesActions from 'redux/modules/public/appraisalHistories';

// import { connect } from 'react-redux';
// import { asyncConnect } from 'redux-async-connect';
// import * as branchActions from 'redux/modules/public/repository';
// import { load as loadBranchs } from 'redux/modules/public/repository';


import dataPawnSimulation from 'data/pawn/simulation.json';

import listPartners from 'data/branch.json';

import SearchBox from './SearchBox';

import sampleImage from './img/mekar.jpg';

// import SelectFieldWrapper from '../../UI/Form/SelectFieldWrapper';
import { Container, Header,
  // Content,
  Spacer, Loader, Landing } from '../../UI';
// import { Container, Header, Spacer } from '../../UI';
// import { Content } from '../../UI';
// import { Link } from '../../UI';

import Layout from '../../App/Layout';

// import AppraisalItem from '../AppraisalHistory/AppraisalItem/AppraisalItem';


// Inisialiasi action
// const { load: loadAppraisalHistories } = appraisalHistoriesActions;

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
    margin: '0 auto',
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
    width: 280,
    height: 212,
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
  textCenter: Layout.textCenter
};
/*
const listPartners = {
  center: [-6.183047999999999, 106.816793],
  branchs: [{
    id: 11,
    isMitra: false,
    category: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      10
    ],
    name: 'Pinjam.co.id - Sungai Sambas',
    address: 'Jl. Sungai Sambas II No. 13 Kebayoran Baru, Jakarta',
    telephoneLabel: '(021) 2750 6800',
    telephone: '+622127506800',
    email: 'abcdef@pinjam.co.id',
    lat: -6.247198,
    lng: 106.7974629
  },
  {
    id: 14,
    isMitra: false,
    category: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      10
    ],
    name: 'Pinjam.co.id - Tanah Abang',
    address: 'Pasar Tanah Abang, Blok B Lantai 5 Los E No. 50 Jakarta Pusat',
    telephoneLabel: '(021) 2357 3545',
    telephone: '+622123573545',
    email: 'abcdef@pinjam.co.id',
    lat: -6.183047999999999,
    lng: 106.816793
  }]
};

*/

// Inisialiasi action
const { load: loadAppraisalHistories } = appraisalHistoriesActions;

@injectSheet(styles)

// @asyncConnect([{
//   deferred: true,
//   promise: ({
//       store: {
//           dispatch
//       }
//   }) => {
//     return dispatch(loadBranchs());
//   }
// }])
// @connect(state => {
//   return ({
//     identity: state.auth.identity,
//     branchData: state.branchs.data,
//     loading: state.branchs.loading,
//     branchsError: state.branchs.branchsError
//     // branchData: state.branchs,
//     // loading: state.branchs,
//     // branchsError: state.branchs
//   });
// }, {
//   ...branchActions
// })


@asyncConnect([
  {
    deferred: true,
    promise: ({ store: {
        dispatch
      } }) => {
      const promises = [];

      /**
       * Request data riwayat taksiran
       */
      promises.push(dispatch(loadAppraisalHistories()));

      return Promise.all(promises);
    }
  }
])
@connect(state => ({ appraisalHistories: state.appraisalHistories.data, loading: state.appraisalHistories.loading }), {
  ...appraisalHistoriesActions
})

@reduxForm({ form: 'formAppraisalHistory', formKey: 'formAppraisalHistory' })

export default class Inner extends Component {


  static propTypes = {
    sheet: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    appraisalHistories: PropTypes.object,
    loading: PropTypes.bool
  }

  static defaultProps = {
    appraisalHistories: null,
    loading: false
  }

  state = {
    category: 0, // Default ke opsi -> Semua
    categories: dataPawnSimulation.categories,
    name: null,
    appraisalHistories: [],
    branchPartnersState: listPartners.branchs,
      // appraisalHistories: []
  }

  // static propTypes = {
  //   sheet: PropTypes.object.isRequired
  // }

  // state = {
  //   branchPartnersState: listPartners.branchs,
  //   appraisalHistories: []
  // }


  componentWillMount = () => {
    const { load } = this.props;
    const { categories } = this.state;
    const that = this;

    // Tambah temporary category, untuk dapatkan semua katergori
    categories.unshift({ label: 'Semua', value: '0' });

    setTimeout(() => {
      load().then(result => {
        that.setState({ categories, appraisalHistories: result });
      });
    }, 100);
  }

  componentWillUnmount = () => {
    const { categories } = this.state;

    // Buang temporary category
    categories.shift();

    this.setState({ categories });
  }


  /**
   * Melakukan pengecekan teks setiap ada perubahan input pada inputText
   * Jika teks (karakter) yang di-input-kan memiliki kesamaan dengan data NAMA atau ALAMAT mitra
   * list data akan muncul sesuai teks yang diinputkan
   *
   * @param {string} searchName
   * @returns {object}
   * @memberOf PartnersAddress
   */
  onSearch = (searchName: string) => {
    setTimeout(() => {
      const resultPartners = listPartners
        .branchs
        .filter(mitra => mitra.name.toLowerCase().includes(searchName.toLowerCase()) ||
        mitra.address.toLowerCase().includes(searchName.toLowerCase()));
      if (searchName !== '') {
        this.setState({ branchPartnersState: resultPartners });
      } else {
        this.setState({ branchPartnersState: listPartners.branchs });
      }
    }, 100);
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

    this
      .state
      .branchPartnersState
      .map((branch) => {
        if (branch.visible !== false) {
          ++idx;
          branch.number = idx;
          partners.push(branch);
        }
        return branch;
      });

    return partners;
  }

  searchOnChange = (searchCategory: string) => {
    const { name } = this.state;
    const { load } = this.props;
    const that = this;

    setTimeout(() => {
      that.setState({ category: searchCategory });
      load({ name: { name }, category: searchCategory || 0 }).then(result => {
        that.setState({ appraisalHistories: result });
      });
    }, 100);
  }

  render() {
    const { loading, appraisalHistories } = this.props;
    const { sheet: {
        classes
      } } = this.props;
      /* <Content
                    key={`mitra-${mitra.number}`} className={classes.item}>
                    <h4 className={classes.itemTitle}>{mitra.name}</h4>
                    {mitra.address}
                    <br />
                    Telp. <Link
                      className={classes.noUnderline}
                      href={`tel: ${mitra.telephone}`}>
                      {mitra.telephoneLabel}</Link>
                  </Content>*/
    console.log(appraisalHistories.data);
    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container style={styles.contentWrapper}>
          <Helmet
            title="Some Title of List" />
          <Spacer />
          <Header primaryText="Some Title of List" />
          <SearchBox onSearch={this.onSearch} />
          <span className={classes.verticalLine}></span>

          {/* <Card>
            <Content className={classes.taksiran}>
              {/* <SearchBox onSearch={this.onSearch} />

              <Field
                name="category"
                component={SelectFieldWrapper}
                onSelect={this.searchOnChange}
                floatingLabelText="Kategori"a
                fullWidth>
                {dataPawnSimulation.categories.map((category) => <MenuItem
                  key={`category-${category.label}`}
                  value={category.value}
                  primaryText={category.label} />
                )}
              </Field> * /}

              {/* Tampilkan loader jika data sedang di load * /}
              {loading && <Loader />}

              {/* Tampil jika data kosong * /}
              {(!appraisalHistories) && <Landing small>Belum ada informasi</Landing>}

              <Spacer />

              {/* Tampilan riwayat taksiran * /}
              {!loading && appraisalHistories &&
                <Paper zDepth={1}>
                  {appraisalHistories.data.map((appraisal) =>
                    <AppraisalItem key={`appraisal-${appraisal.id}`} data={appraisal} />)}
                </Paper>
              }

              <Spacer />

            </Content>
          </Card> */}

          <div>
            {/* <div className={classes.gridItem}>
              <div className={classes.gridCard}>
                <div className={classes.gridContentWrapper}>
                  <div className={classes.gridImageWrapper}>
                    <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                  </div>
                  <h4 className={classes.gridTitle}>sebuah judul yang normal</h4>
                  <p className={classes.gridBodyCopy}>penjelasan yang panjangnya normal</p>
                </div>
              </div>
            </div>
            <div className={classes.gridItem}>
              <div className={classes.gridCard}>
                <div className={classes.gridContentWrapper}>
                  <div className={classes.gridImageWrapper}>
                    <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                  </div>
                  <h4 className={classes.gridTitle}>sebuah judul yang normal</h4>
                  <p className={classes.gridBodyCopy}>penjelasan yang panjangnya normal</p>
                </div>
              </div>
            </div>*/}

            {/* Tampilkan loader jika data sedang di load */}
            {loading && <Loader />}

            {/* Tampil jika data kosong */}
            {(!appraisalHistories) && <Landing small>Belum ada informasi</Landing>}

            <Spacer />

            {/* Tampilan riwayat taksiran */}
            {!loading && appraisalHistories &&
              <div className={classes.listWrapper} zDepth={1}>
                {appraisalHistories.data.map(
                  (mitra) => <div key={`mitra-${mitra.id}`} className={classes.gridItem}>
                    <Link href={`/details/${mitra.id}`}>
                      <div className={classes.gridCard}>
                        <div className={classes.gridContentWrapper}>
                          <div className={classes.gridImageWrapper}>
                            <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                          </div>
                          <h4 className={classes.gridTitle}>{mitra.name}</h4>
                          <p className={classes.gridBodyCopy}>{mitra.price}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  )}
              </div>
            }

            <Spacer />
            {/*
            {this
            .getPartners()
            .length > 0 && <div className={classes.listWrapper}>
              {this
                .getPartners()
                .map(
                  (mitra) => <div key={`mitra-${mitra.number}`} className={classes.gridItem}>
                    <Link href={`/details/${mitra.id}`}>
                      <div className={classes.gridCard}>
                        <div className={classes.gridContentWrapper}>
                          <div className={classes.gridImageWrapper}>
                            <img className={classes.gridImage} src={`${sampleImage}`} alt="Mekar" />
                          </div>
                          <h4 className={classes.gridTitle}>{mitra.name}</h4>
                          <p className={classes.gridBodyCopy}>{mitra.telephone}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  )
              }
            </div>}
            {this
              .getPartners()
              .length === 0 && <Content className={classes.textCenter}>
                <h4>Nama toko atau alamat yang Anda cari belum ada.<br /> Mohon cari dengan kata kunci lain</h4>
              </Content>
            } */}
          </div>
          <Spacer />
        </Container>
      </div>
    );
  }
}
