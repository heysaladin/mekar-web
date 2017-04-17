import React from 'react';
// import injectSheet from 'react-jss';
import Helmet from 'react-helmet';

import Card from 'material-ui/Card/Card';

import { Container, Content, Spacer, Link, Button } from '../../UI';

import Layout from '../../App/Layout';

const styles = {
  container: {
    height: 400,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  wrap: {
    flex: 1
  },
  title: {
    fontWeight: 300,
    fontSize: Layout.fontSize + 40,
    margin: Layout.margin + 10,
  },
  subTitle: {
    fontSize: Layout.fontSize + 10,
    textTransform: 'uppercase'
  }
};

export default function NotFound() {
  return (
    <Container>
      <Helmet title="Upss.. Halaman tidak ditemukan" />
      <Spacer />
      <Spacer />
      <Spacer />
      <Content>
        <Card>
          <div style={styles.container}>
            <div style={styles.wrap}>
              <div style={{ padding: '0 40px' }}>
                <h4 style={styles.title}>whuups!</h4>
                <Spacer />
                <p>
                  Maaf, kami tidak dapat menemukan halaman yang diminta.
                  <br />Mungkin Anda mengetik URL yang salah. Coba lagi atau ...
                </p>
                <Spacer />
                <Link to="/"><Button label="Ke Beranda" secondary /></Link>
                <Spacer />
                <Spacer />
              </div>
            </div>
          </div>
        </Card>
      </Content>
      <Spacer />
      <Spacer />
    </Container>
  );
}
