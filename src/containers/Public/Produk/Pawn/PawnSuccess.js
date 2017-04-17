import React, { Component, PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import Helmet from 'react-helmet';

import Layout from '../../../App/Layout';
import {
  Container,
  Content,
  Spacer,
  Landing,
  Button,
  Link
} from '../../../UI';
import iconThumbsUp from '../../../Shared/ic-thumbsup.svg';

const style = {
  title: {
    fontSize: Layout.fontSize + 3,
    textTransform: 'uppercase'
  }
};

export default class PawnSuccess extends Component {

  render() {
    return (
      <Container>
        <Helmet title="Pengajuan Berhasil" />
        <Spacer />
        <Spacer />
        <Card>
          <Content>
            <Landing>
              <h4 style={style.title}>Pengajuan Anda Berhasil</h4>
              <br />
              <img src={iconThumbsUp} height="100" alt="" />
              <br /><br />
              <p>
                Terima kasih, pengajuan Anda berhasil.<br />
                Silakan tunggu konfirmasi dari kami
              </p>
              <br /><br />
              <Link to="/konfirmasi"><Button label="Lihat pengajuan saya" secondary /></Link>
            </Landing>
          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}
