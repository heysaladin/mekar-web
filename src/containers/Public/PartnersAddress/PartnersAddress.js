import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import listPartners from 'data/branch.json';
import { Container, Header, Content, Spacer, Link } from '../../UI';
import SearchBox from './SearchBox';

import styles from './partnersAddressStyles';
@injectSheet(styles)

export default class PartnersAddress extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired
  }

  state = {
    branchPartnersState: listPartners.branchs,
    appraisalHistories: []
  }

  onSearch = (searchName) => {
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
      <Container>
        <Helmet
          title="Daftar Alamat Toko/Mitra Kami" />
        <Spacer />
        <Header primaryText="Daftar Alamat Toko/Mitra Kami" />
        <SearchBox onSearch={this.onSearch} />
        <Card>
          {this
            .getPartners()
            .length > 0 && <div>
              {this
                .getPartners()
                .map((mitra, idx) => <Content
                  key={`mitra-${idx.id}`} className={classes.item}>
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

        </Card>
        <Spacer />
      </Container>
    );
  }
}
