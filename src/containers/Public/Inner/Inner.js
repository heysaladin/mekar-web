import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
// import Card from 'material-ui/Card/Card';

import SearchBox from './SearchBox';

import { Container, Header, Spacer } from '../../UI';
import { Content } from '../../UI';
import { Link } from '../../UI';

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
    margin: '50px auto'
  },
  textCenter: Layout.textCenter
};

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
          <div className={classes.listWrapper}>
            {this
            .getPartners()
            .length > 0 && <div>
              {this
                .getPartners()
                .map((mitra) =>
                  <Content
                    key={`mitra-${mitra.number}`} className={classes.item}>
                    <h4 className={classes.itemTitle}>{mitra.name}</h4>
                    {mitra.address}
                    <br />
                    Telp. <Link
                      className={classes.noUnderline}
                      href={`tel: ${mitra.telephone}`}>
                      {mitra.telephoneLabel}</Link>
                  </Content>)
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
