import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
// import IconButton from 'material-ui/IconButton';
// import FaFacebook from 'react-icons/lib/fa/facebook';
// import FaTwitter from 'react-icons/lib/fa/twitter';
// import FaInstagram from 'react-icons/lib/fa/instagram';
// import FaYoutubePlay from 'react-icons/lib/fa/youtube-play';
import config from 'config';
// import MdEmail from 'react-icons/lib/md/email';
// import MdLocalPhone from 'react-icons/lib/md/local-phone';

import { Container, Spacer } from '../../UI'; // , Link

import styles from './footerStyles';

// import logoOJK from './logo-ojk.png';

@injectSheet(styles)
class Footer extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired
  };

  render() {
    const { sheet: {
        classes
      } } = this.props;

    return (
      <footer className={classes.footer}>
        <Container className={classes.footerContainer}>
          {/* <Link to={config.app.social.facebook.url} target="_blank">
            <IconButton
              tooltip={config.app.social.facebook.name}
              iconStyle={styles.socialMediaSmallIcon}
              style={styles.socialMediaSmall}><FaFacebook /></IconButton>
          </Link>
          <Link to={config.app.social.twitter.url} target="_blank">
            <IconButton
              tooltip={config.app.social.twitter.name}
              iconStyle={styles.socialMediaSmallIcon}
              style={styles.socialMediaSmall}><FaTwitter /></IconButton>
          </Link>
          <Link to={config.app.social.instagram.url} target="_blank">
            <IconButton
              tooltip={config.app.social.instagram.name}
              iconStyle={styles.socialMediaSmallIcon}
              style={styles.socialMediaSmall}><FaInstagram /></IconButton>
          </Link>
          <Link to={config.app.social.youtube.url} target="_blank">
            <IconButton
              tooltip={config.app.social.youtube.name}
              iconStyle={styles.socialMediaSmallIcon}
              style={styles.socialMediaSmall}><FaYoutubePlay /></IconButton>
          </Link>

          <Spacer />*/}

          {/* <a href={`tel:${config.app.hotline.phone.value}`} style={styles.footerLink}>
            <MdLocalPhone /> {config.app.hotline.phone.label}
          </a>

          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>

          <a href={`mailto:${config.app.hotline.email.value}`} style={styles.footerLink}>
            <MdEmail /> {config.app.hotline.email.label}
          </a>

          <Spacer />

          <span>Terdaftar dan Diawasi Oleh</span>
          <Spacer />
          <img src={logoOJK} alt="OJK" height="62" width="144" />*/}

          <Spacer />

          <span>{config.app.copyright}</span>
        </Container>
      </footer>
    );
  }
}

export default Footer;
