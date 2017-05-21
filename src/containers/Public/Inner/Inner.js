import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
// import Card from 'material-ui/Card/Card';

import listPartners from 'data/branch.json';

import SearchBox from './SearchBox';

import sampleImage from './img/mekar.jpg';

import { Container, Header, Spacer } from '../../UI';
import { Content } from '../../UI';
// import { Link } from '../../UI';

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
@injectSheet(styles)

export default class Inner extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired
  }

  state = {
    branchPartnersState: listPartners.branchs,
    appraisalHistories: []
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

  render() {
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
            {this
              .getPartners()
              .length === 0 && <Content className={classes.textCenter}>
                <h4>Nama toko atau alamat yang Anda cari belum ada.<br /> Mohon cari dengan kata kunci lain</h4>
              </Content>
            }
          </div>
          <Spacer />
        </Container>
      </div>
    );
  }
}
