import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import { Container, Header, Content, Spacer, Link } from '../../UI';

import styles from './sitemapStyles';
@injectSheet(styles)

export default class SiteMap extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired
  }
  render() {
    const { sheet: {
        classes
      } } = this.props;
    return (
      <Container>
        <Helmet
          title="Peta Situs" />
        <Spacer />
        <Header primaryText="Peta Situs" />
        <Spacer />
        <Card>
          <Content>
            <h4 className={classes.textUppercase}>Pinjam.co.id</h4>
            <ul>
              <li>
                <Link to="/riwayat-taksiran">Riwayat Taksiran</Link>
              </li>
              <li>
                <Link
                  href="https://pinjam.co.id/blog"
                  target="_blank"
                  rel="noopener noreferrer">Blog</Link>
              </li>
              <li>
                <Link to="/perusahaan/tentang">Tentang Pinjam</Link>
              </li>
              <li>
                <Link to="/perusahaan/kenapa">Kenapa Pinjam</Link>
              </li>
              <li>
                <Link to="/perusahaan/rekan">Rekan Pinjam.co.id</Link>
              </li>
              <li>
                <Link to="/perusahaan/tim">Tim Pinjam.co.id</Link>
              </li>
              <li>
                <Link to="/perusahaan/karier">Karier Pinjam.co.id</Link>
              </li>
              <li>
                <Link to="/testimoni">Testimoni</Link>
              </li>
              <li>
                <Link to="/media">Media</Link>
              </li>
              <li>
                <Link to="/bantuan/syarat-ketentuan">Syarat Dan Ketentuan</Link>
              </li>
              <li>
                <Link to="/bantuan/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/bantuan/hubungi-kami">Hubungi Kami</Link>
              </li>
            </ul>
            <Spacer />
            <h4 className={classes.textUppercase}>Akun</h4>
            <ul>
              <li>
                <Link to="/masuk">Masuk</Link>
              </li>
              <li>
                <Link to="/daftar">Daftar</Link>
              </li>
              <li>
                <Link to="/lupa-kata-sandi">Lupa Kata Sandi</Link>
              </li>
            </ul>
            <Spacer />
            <h4 className={classes.textUppercase}>Kategori Produk</h4>
            <ul>
              <li>
                <Link to="/gadai">Gadai</Link>
              </li>
              <li>
                <Link to="/pinjaman">Pinjaman</Link>
              </li>
            </ul>
            <Spacer />
            <h4 className={classes.textUppercase}>Mitra Pinjam</h4>
            <ul>
              <li>
                <Link to="/mitra">Daftar Mitra</Link>
              </li>
            </ul>
            <Spacer />
          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}
