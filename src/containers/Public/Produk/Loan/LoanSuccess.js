import React, { Component, PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import {
  Container,
  Content,
  Spacer,
  Landing,
  Button,
  Link
} from '../../../UI';
import iconThumbsUp from '../../../Shared/ic-thumbsup.svg';

import styles from './loanSuccessStyles';
@injectSheet(styles)

export default class LoanSuccess extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    sheet: PropTypes.object.isRequired
  }

  getInitialValues = () => {
    const { location } = this.props;
    return location.state && location.state.oauth;
  }

  render() {
    const { sheet: {
        classes
      } } = this.props;
    return (
      <Container>
        <Helmet title="Pengajuan Berhasil" />
        <Spacer />
        <Spacer />
        <Card>
          <Content>
            <Landing>
              <h4 className={classes.title}>Pengajuan Anda Berhasil</h4>
              <br />
              <img src={iconThumbsUp} height="100" alt="" />
              <br /><br />
              <p>
                Terima kasih, pengajuan Anda berhasil.<br />
                Silakan tunggu konfirmasi dari kami
              </p>
              <br /><br />
              <Link to="/"><Button label="ke Beranda" secondary /></Link>
            </Landing>
          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}
