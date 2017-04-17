import React, { Component, PropTypes } from 'react';
import { Flex, Box } from 'reflexbox';
import Card from 'material-ui/Card/Card';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import Container from '../../UI/Container';
import Header from '../../UI/Header';
import Content from '../../UI/Content';
import Spacer from '../../UI/Spacer';
import Link from '../../UI/Link';

import imageBeritaSatu from './Assets/berita_satu.jpg';
import imageBisnisCom from './Assets/bisnis_com.jpg';
import imageDailySocial from './Assets/daily_social.jpg';
import imageDealStreetAsia from './Assets/dealstreetasia.jpg';
import imageDetikCom from './Assets/detikcom.jpg';
import imageKompas from './Assets/kompas.jpg';
import imageKontan from './Assets/kontan.jpg';
import imageMoneter from './Assets/moneter.jpg';
import imageOkezone from './Assets/okezone.jpg';
import imagePasarDana from './Assets/pasar_dana.jpg';
import imageRepublika from './Assets/republika.jpg';
import imageSelularID from './Assets/selular_id.jpg';
import imageSindoNews from './Assets/sindo_news.jpg';
import imageSWA from './Assets/swa.jpg';
import imageTechInAsia from './Assets/techinasia.jpg';
import imageTechnoID from './Assets/techno_id.jpg';
import imageTeknojurnal from './Assets/teknojurnal.jpg';
import imageTheJakartaPost from './Assets/the_jakarta_post.jpg';
import imageTribunTechno from './Assets/tribun_techno.jpg';
import imageViva from './Assets/viva.jpg';

import styles from './mediaStyles';
@injectSheet(styles)

export default class Media extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired
  }
  render() {
    const { sheet: {
        classes
      } } = this.props;
    return (
      <Container>
        <Helmet title="Media" />
        <Spacer />
        <Header
          primaryText="Media Publikasi"
          secondaryText="Berbagai media telah meliput kami" />
        <Spacer />
        <Card>
          <Content>
            <Flex>
              <Box className={classes.grid}>
                <Link
                  to="https://id.techinasia.com/pinjam-situs-pegadaian-online-indonesia"
                  target="_blank">
                  <img src={imageTechInAsia} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link
                  href="http://finance.detik.com/moneter/3223283/gadai-online-minta-status-legal-dari-ojk"
                  target="_blank">
                  <img src={imageDetikCom} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>
            <Flex>
              <Box className={classes.grid}>
                <Link
                  href="http://teknologi.news.viva.co.id/news/
                  read/772861-unik-startup-lokal-ini-beri-pinjaman-lewat-gadai-online"
                  target="_blank">
                  <img src={imageViva} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link
                  href="http://autotekno.sindonews.com/read/1108438/133/
                  unik-kini-pinjam-uang-bisa-lewat-online-1463193001"
                  target="_blank">
                  <img src={imageSindoNews} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>

            <Flex>
              <Box className={classes.grid}>
                <Link
                  href="http://www.beritasatu.com/digital-life/
                  365056-startup-lokal-ini-berikan-layanan-gadai-online.html"
                  target="_blank">
                  <img src={imageBeritaSatu} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link
                  href="http://tv.kompas.com/read/2016/06/06/4928420009001/maraknya.fintech.di.indo.apa.sih.itu."
                  target="_blank">
                  <img src={imageKompas} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>
            <Flex>
              <Box className={classes.grid}>
                <Link
                  href="https://dailysocial.id/post/
                  ciptakan-ekosistem-bisnis-fintech-yang-sehat-dan-dinamis-indonesia-fintech-forum-kembali-digelar/"
                  target="_blank">
                  <img src={imageDailySocial} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link
                  href="http://keuangan.kontan.co.id/news/pinjamco-kembalikan-kelebihan-hasil-lelang"
                  target="_blank">
                  <img src={imageKontan} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>

            <Flex>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageBisnisCom} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageRepublika} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>
            <Flex>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageTeknojurnal} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link
                  href="http://www.thejakartapost.com/news/2016/06/17/
                  newbie-cashlez-pinjam-eye-robust-transactions-growth.html"
                  target="_blank">
                  <img src={imageTheJakartaPost} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>

            <Flex>
              <Box className={classes.grid}>
                <Link
                  href="http://www.techno.id/startup/bidik-menengah-bawah-pinjamcoid-fokus-edukasi-pasar-150806a.html"
                  target="_blank">
                  <img src={imageTechnoID} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageDealStreetAsia} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>
            <Flex>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageOkezone} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageSelularID} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>

            <Flex>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageMoneter} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageTribunTechno} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>
            <Flex>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imageSWA} width="100%" alt="" />
                </Link>
              </Box>
              <Box className={classes.grid}>
                <Link href="(javascript:void(0))" target="_blank" rel="noopener noreferrer">
                  <img src={imagePasarDana} width="100%" alt="" />
                </Link>
              </Box>
            </Flex>

          </Content>
        </Card>
        <Spacer />
      </Container>
    );
  }
}
