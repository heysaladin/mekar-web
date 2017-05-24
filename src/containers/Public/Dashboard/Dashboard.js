import React, {
    Component,
    PropTypes
} from 'react';
import Helmet from 'react-helmet';
// import View from 'react-flexbox';
// import {
//     Link
// } from 'react-router';
import {
    Card,
    CardHeader
} from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import MdEmail from 'react-icons/lib/md/email';
// import MdLocalPhone from 'react-icons/lib/md/local-phone';
// import MdDateRange from 'react-icons/lib/md/date-range';
// import MdHome from 'react-icons/lib/md/home';
// import Avatar from 'material-ui/Avatar';
// import MdAccountCircle from 'react-icons/lib/md/account-circle';
// import {
//     currency,
//     date
// } from 'utils/filter';
import {
    connect
} from 'react-redux';
// import {
//     asyncConnect
// } from 'redux-async-connect';
// import * as profileActions from 'redux/modules/membership/profile/profile';
// import {
//     // isLoaded,
//     load as loadProfile
// } from 'redux/modules/membership/profile/profile';
import injectSheet from 'react-jss';

import listPartners from 'data/branch.json';

import SearchBox from './SearchBox';

import sampleImage from './img/mekar.jpg';

import {
    Container,
    Content,
    Spacer,
    // Button
} from '../../UI';

import styles from './profileStyles';
@injectSheet(styles)

// @asyncConnect([{
//   deferred: true,
//   promise: ({
//       store: {
//           dispatch,
//           // getState
//       }
//   }) => {
//     // const state = getState();
//     dispatch(loadProfile({
//       // state.auth.identity.id
//       userId: 21453
//     }));
//   }
// }])
@connect(state => {
  const profileData = {
    data: {
      profile: {
        accountName: 'Milan',
        accountNumber: '0987654321',
        address: 'Jalan Patra Kuningan X',
        addressById: 'Jalan Patra Kuningan XV',
        bank: '1',
        bankBranch: 'KPC Kuningan',
        birthday: '1995-2-9',
        birthplace: '190',
        city: '190',
        cityById: '190',
        code: 'P1700188',
        email: 'm.milan@gmail.com',
        gender: 'P',
        handphone: '085891550128',
        id: 21453,
        idCard: '1234567890',
        mothername: 'Upiek',
        name: 'Muhammad Milan',
        photoIDCard: 'https://s3-ap-southeast-1.amazonaws.com/image-static-pinjam/activities/21453/2017/03/15/b66bac28296847053c00e4894efb5830.jpg',
        photoProfile: 'https://s3-ap-southeast-1.amazonaws.com/image-static-pinjam/activities/21453/2017/03/15/a219fe78b36360de59e19b4fd072190d.jpg'
      }
    }
  };
  return ({
    identity: state.auth.identity,
    // profile: state.profile.data,
    profile: profileData,
    // loading: state.profile.loading
    loading: false
  });
}, {
  // ...profileActions
})

export default class Dashboard extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    // get: PropTypes.object.isRequired,
    // loading: PropTypes.bool.isRequired,
    // profile: PropTypes.object.isRequired,
    // identity: PropTypes.number.isRequired,
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
    // const {
    //   // profile,
    //   // loading,
    //   // identity
    // } = this.props;
    const { sheet: {
        classes
      } } = this.props;

    // let userProfile = {};
    // let userSummary = {};
    // if (profile) {
    //   userProfile = profile.data.profile;
    //   // userSummary = profile.data.summary;
    //   userSummary = {
    //     total: '',
    //     totalLoan: '0',
    //     totalPawn: '0'
    //   };
    // }

    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container>
          <Helmet title="Profil" />
          <Spacer />
          <Card style={styles.card}>
            <CardHeader title="Dashboard" textStyle={styles.headerText} titleStyle={styles.headerTitle} style={styles.header} />
            <Content className={classes.noPadding}>
              <div className={classes.wrap}>
                <SearchBox onSearch={this.onSearch} />
                <div>
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
              </div>
            </Content>
          </Card>
          <Spacer />
        </Container>
      </div>
    );
  }
}
