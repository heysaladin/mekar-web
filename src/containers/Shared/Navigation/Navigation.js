import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';
// import { List, ListItem } from 'material-ui/List';
import {
  // // MdArrowDropDown,
  // // MdNotifications,
  // MdSettingsInputAntenna,
  // // MdAccountCircle,
  // // MdMoreVert,
  MdClose,
  MdHome,
  // MdLocationOn,
  // MdAccessTime,
  // MdQuestionAnswer,
  // MdLocationCity,
  // MdHelp,
  // MdSupervisorAccount,
  MdAccountBox,
  // // MdExitToApp,
  // MdDeviceHub
} from 'react-icons/lib/md';

import { connect } from 'react-redux';
import * as authActions from 'redux/modules/auth';

import Layout from '../../App/Layout';
import Theme from '../../App/Theme';
import Logo from '../../Shared/Logo/Logo';
import NavigationItem from './NavigationItem';


const styles = {
  logo: {
    margin: 0,
    top: 0
  },
  buttonClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 48,
    height: 48
  },
  buttonCloseIcon: {
    width: 24,
    height: 24,
    color: Theme.secondaryTextColor
  },
  account: {
    position: 'relative',
    // background: Theme.colorGreyLight,
    background: '#444',
    padding: '7px 15px'
  },
  accountName: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: Layout.margin,
    width: '62%',
    textAlign: 'left',
    overflow: 'hidden'
  },
  accountAuth: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginTop: Layout.margin,
    width: '65%',
    textAlign: 'center',
    overflow: 'hidden'
  }
};

@injectSheet(styles)
@connect(
  state => ({ user: state.auth.user }),
  authActions)
export default class Navigation extends Component {

  static propTypes={
    sheet: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
  };

  static defaultProps={
    user: null
  };

  render() {
    const { sheet: { classes }, user, logout, open, close } = this.props;

    return (
      <Drawer openSecondary disableSwipeToOpen docked={false} width={240} open={open} onRequestChange={close}>
        <div className={classes.account}>
          <Logo className={classes.logo} />
          <IconButton
            iconStyle={styles.buttonCloseIcon}
            style={styles.buttonClose}
            onTouchTap={close}>
            <MdClose />
          </IconButton>
        </div>
        <List>
          <NavigationItem label="Beranda" leftIcon={<MdHome />} to="/" afterTouch={close} />
          {/* <NavigationItem
            label="Riwayat Taksiran"
            leftIcon={<MdAccessTime />}
            to="/riwayat-taksiran"
            afterTouch={close} />
          <NavigationItem label="Mitra" leftIcon={<MdSupervisorAccount />} to="/mitra" afterTouch={close} />
          <NavigationItem
            label="Alamat Cabang & Mitra"
            leftIcon={<MdLocationOn />}
            to="/alamat-cabang-mitra"
            afterTouch={close} />
          <Divider />
          <NavigationItem label="Tentang" leftIcon={<MdLocationCity />} to="/perusahaan/tentang" afterTouch={close} />
          <NavigationItem label="Kenapa" leftIcon={<MdLocationCity />} to="/perusahaan/kenapa" afterTouch={close} />
          <NavigationItem label="Rekan" leftIcon={<MdLocationCity />} to="/perusahaan/rekan" afterTouch={close} />
          <NavigationItem label="Tim" leftIcon={<MdLocationCity />} to="/perusahaan/tim" afterTouch={close} />
          <NavigationItem label="Karir" leftIcon={<MdLocationCity />} to="/perusahaan/karir" afterTouch={close} />
          <Divider />
          <NavigationItem label="FAQ" leftIcon={<MdHelp />} to="/bantuan/faq" afterTouch={close} />
          <NavigationItem label="Hubungi Kami" leftIcon={<MdHelp />} to="/bantuan/hubungi-kami" afterTouch={close} />
          <NavigationItem
            label="Syarat Ketentuan"
            leftIcon={<MdHelp />}
            to="/bantuan/syarat-ketentuan"
            afterTouch={close} />
          <Divider />
          <NavigationItem label="Testimoni" leftIcon={<MdQuestionAnswer />} to="/testimoni" afterTouch={close} />
          <NavigationItem label="Media" leftIcon={<MdSettingsInputAntenna />} to="/media" afterTouch={close} />
          <NavigationItem label="Peta Situs" leftIcon={<MdDeviceHub />} to="/peta-situs" afterTouch={close} />*/}
          <Divider />
          {/*
            <Divider />
            <List>
              <ListItem
                primaryText="Testimoni"
                leftIcon={<MdQuestionAnswer />}
                style={styles.navigationMain}
                onTouchTap={this
                .goTo
                .bind(this, '/testimoni')} />
              <ListItem
                primaryText="Media"
                leftIcon={<MdSettingsInputAntenna />}
                style={styles.navigationMain}
                onTouchTap={this
                .goTo
                .bind(this, '/media')} />
              <ListItem
                primaryText="Perusahaan"
                leftIcon={<MdLocationCity />}
                style={styles.navigationMain}
                nestedItems={[<ListItem
                  key={
                    11
                  }
                  primaryText="Tentang Pinjam.co.id" style={
                    styles.navigationSub
                  }
                  onTouchTap={
                      this
                      .goTo
                      .bind(this, '/perusahaan/tentang')
                  } />, <ListItem
                  key={
                    12
                  }
                  primaryText="Kenapa Pinjam.co.id" style={
                    styles.navigationSub
                  }
                  onTouchTap={
                      this
                      .goTo
                      .bind(this, '/perusahaan/kenapa')
                  } />, <ListItem
                  key={
                    13
                  }
                  primaryText="Rekan Pinjam.co.id" style={
                    styles.navigationSub
                  }
                  onTouchTap={
                      this
                      .goTo
                      .bind(this, '/perusahaan/rekan')
                  } />, <ListItem
                  key={
                    14
                  }
                  primaryText="Tim Pinjam.co.id" style={
                    styles.navigationSub
                  }
                  onTouchTap={
                      this
                      .goTo
                      .bind(this, '/perusahaan/tim')
                  } />, <ListItem
                  key={
                    15
                  }
                  primaryText="Karier Pinjam.co.id" style={
                    styles.navigationSub
                  }
                  onTouchTap={
                      this
                      .goTo
                      .bind(this, '/perusahaan/karier')
                  } />
              ]}
                primaryTogglesNestedList />
              <ListItem
                primaryText="Bantuan"
                leftIcon={<MdHelp />}
                style={styles.navigationMain}
                nestedItems={[ <ListItem
                  key={
                    112
                  }
                  primaryText="Syarat dan Ketentuan" style={
                    styles.navigationSub
                  }
                  onTouchTap ={
                      this
                      .goTo
                      .bind(this, '/bantuan/syarat-ketentuan')
                  } />, <ListItem
                  key={
                    122
                  }
                  primaryText="FAQ" style={
                    styles.navigationSub
                  }
                  onTouchTap={
                      this
                      .goTo
                      .bind(this, '/bantuan/faq')
                  } />, <ListItem
                  key={
                    123
                  }
                  primaryText ="Hubungi Kami" style={
                    styles.navigationSub
                  }
                  onTouchTap={
                      this
                      .goTo
                      .bind(this, '/bantuan/hubungi-kami')
                  } />
                ]}
                primaryTogglesNestedList />
              <ListItem
                primaryText="Peta Situs"
                leftIcon={<MdDeviceHub />}
                style={styles.navigationMain}
                onTouchTap={this
                .goTo
                .bind(this, '/peta-situs')} />
            </List>
          */}
          {user && <NavigationItem label="Keluar" leftIcon={<MdHome />} toAction={logout} afterTouch={close} />}

          {!user && <div>
            <NavigationItem label="Daftar" leftIcon={<MdAccountBox />} to="/register" afterTouch={close} />
            <NavigationItem label="Masuk" leftIcon={<MdAccountBox />} to="/login" afterTouch={close} />
          </div>}
          <Divider />
          <NavigationItem label="Inner" leftIcon={<MdAccountBox />} to="/inner" afterTouch={close} />
          <NavigationItem label="Profile" leftIcon={<MdAccountBox />} to="/profile" afterTouch={close} />
          <NavigationItem label="Dashboard" leftIcon={<MdAccountBox />} to="/dashboard" afterTouch={close} />
        </List>
      </Drawer>
    );
  }
}
