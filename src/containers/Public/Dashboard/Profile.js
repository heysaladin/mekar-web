import React, {
    Component,
    PropTypes
} from 'react';
import Helmet from 'react-helmet';
// import View from 'react-flexbox';
import {
    Link
} from 'react-router';
import {
    Card,
    CardHeader
} from 'material-ui/Card';
// import RaisedButton from 'material-ui/RaisedButton';
// import MdEmail from 'react-icons/lib/md/email';
// import MdLocalPhone from 'react-icons/lib/md/local-phone';
// import MdDateRange from 'react-icons/lib/md/date-range';
// import MdHome from 'react-icons/lib/md/home';
import Avatar from 'material-ui/Avatar';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import {
    currency,
    date
} from 'utils/filter';
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

import {
    Container,
    Content,
    Spacer,
    Button
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

export default class Profile extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    // get: PropTypes.object.isRequired,
    // loading: PropTypes.bool.isRequired,
    profile: PropTypes.object.isRequired,
    // identity: PropTypes.number.isRequired,
  }

  render() {
    const {
      profile,
      // loading,
      // identity
    } = this.props;
    const { sheet: {
        classes
      } } = this.props;

    let userProfile = {};
    let userSummary = {};
    if (profile) {
      userProfile = profile.data.profile;
      // userSummary = profile.data.summary;
      userSummary = {
        total: '',
        totalLoan: '0',
        totalPawn: '0'
      };
    }

    return (
      <div>
        <div className={classes.openingArea}></div>
        <Container>
          <Helmet title="Profil" />
          <Spacer />
          <Card style={styles.card}>
            <CardHeader title="Akun Saya" textStyle={styles.headerText} titleStyle={styles.headerTitle} style={styles.header} />
            <Content className={classes.noPadding}>
              {/*
              <View auto row>
                <View column width="50%" style={style.summaryContainer}>
                  <div style={style.summaryWrap}>
                    <span>Gadai</span>
                    <h4 style={style.noMargin}>{userSummary.totalPawn || '-'}</h4>
                  </div>
                </View>
                <View column width="50%" style={style.summaryContainer}>
                  <div style={style.summaryWrap}>
                    <span>Pinjaman</span>
                    <h4 style={style.noMargin}>{userSummary.totalLoan || '-'}</h4>
                  </div>
                </View>
              </View>
              */}
              <div auto row>
                <div column width="100%" className={classes.summaryContainer}>
                  <div className={classes.summaryWrap}>
                    <span>Total Pinjaman</span>
                    <h4 className={classes.noMargin}>{currency(userSummary.total) || '-'}</h4>
                  </div>
                </div>
              </div>
              <Spacer />
              <div className={classes.wrap}>
                {userProfile.photoProfile && <Avatar size={160} src={userProfile.photoProfile} />}
                {!userProfile.photoProfile && <Avatar size={160} icon={<MdAccountCircle />} style={{ margin: '0 auto' }} />}
                <Spacer />
                <h3 className={Object.assign(styles.noMargin, styles.textUppercase)}>{userProfile.name || '-'}</h3>
                <span>{userProfile.code || '-'}</span>
                <Spacer />
                <strong>Tanggal Lahir</strong><br />
                <span>{date(userProfile.birthday) || '-'}</span>
                <Spacer />
                <strong>Email</strong><br />
                <span>{userProfile.email || '-'}</span>
                <Spacer />
                <strong>No Handphone</strong><br />
                <span>{userProfile.handphone || '-'}</span>
                <Spacer />
                <Spacer />
                <br />
                <Link to="/profil/ubah"><Button label="Ubah Akun" secondary /></Link>
                <Spacer />
                <Link to="/profil/keamanan"><Button label="Ubah Sandi" secondary /></Link>
              </div>
            </Content>
          </Card>
          <Spacer />
        </Container>
      </div>
    );
  }
}
