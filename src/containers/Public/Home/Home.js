import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
// import Card from 'material-ui/Card/Card';
// import CardMedia from 'material-ui/Card/CardMedia';
// import CardTitle from 'material-ui/Card/CardTitle';

// import { connect } from 'react-redux';
// import config from 'config';

import { Container, Spacer } from '../../UI'; // Content,

import decorator from './decorator.png';

const styles = {
  openingArea: {
    background: '#2a6d5e',
    width: '100%',
    height: 450,
    marginTop: -50,
    backgroundImage: 'linear-gradient(120deg,#447f2c 0%,#2a6d5e 100%)'
  },
  decorator: {
    width: '100%',
    height: 'inherit',
    backgroundSize: 'auto',
    backgroundColor: 'transparent',
    backgroundImage: `url(${decorator})`,
    backgroundPosition: 'center bottom',
    backgroundRepeat: 'no-repeat',
    opacity: '0.5'
  },
  textWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '-330px auto 0'
  },
  mainText: {
    textAlign: 'center',
    color: 'white',
    margin: '5px 0',
    fontSize: 40
  },
  mainBodyCopy: {
    textAlign: 'center',
    color: 'white',
    margin: '10px 0'
  },
  whiteBoard: {
    width: '90%',
    height: 285,
    margin: '-150px auto 0',
    background: 'white',
    borderRadius: 5,
    boxShadow: '0 0 5px rgba(0,0,0,.25)'
  },
  mainContent: {
    minHeight: 230
  },
  verticalLine: {
    display: 'block',
    width: 2,
    height: 90,
    margin: '-45px auto 0',
    background: '#6ec8ce',
    position: 'absolute',
    left: 0,
    right: 0
  },
  contentWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '140px auto 0'
  },
  contentText: {
    textAlign: 'center',
    color: '#15904e',
    margin: '5px 0',
    fontWeight: 'normal'
  },
  contentBodyCopy: {
    textAlign: 'center',
    color: '#ababab',
    margin: '10px 0',
    fontSize: 12
  },
  iconBlock: {
    width: '100%',
    height: 175,
    background: 'white',
    marginTop: 100
  },
  iconWrapper: {
    position: 'absolute',
    marginTop: -50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%'
  },
  iconItem: {
    flex: 1,
    background: 'transparent'
  },
  iconImage: {
    width: 100,
    height: 100,
    background: '#999',
    margin: '0 auto'
  },
  iconText: {
    textAlign: 'center',
    color: '#15904e'
  },
  illustrationWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    height: '90%',
    paddingTop: '5%',
    margin: '0 auto'
  },
  illustrationImageLeft: {
    width: '40%',
    height: '100%',
    background: '#ccc',
    flex: 3
  },
  illustrationImageCenter: {
    width: '20%',
    height: '100%',
    background: '#ccc',
    flex: 1
  },
  illustrationImageRight: {
    width: '40%',
    height: '100%',
    background: '#ccc',
    flex: 3
  }
};

@injectSheet(styles)
// @connect(state => ({ online: state.online }))
export default class Home extends Component {

  static propTypes = {
    // online: PropTypes.bool.isRequired,
    sheet: PropTypes.object.isRequired
  };

  render() {
    const { sheet: { classes } } = this.props;

    return (
      <div>
        <div className={classes.openingArea}>
          <div className={classes.decorator}></div>
          <div className={classes.textWrapper}>
            <h1 className={classes.mainText}>Pretty Web App Generator</h1>
            <h4 className={classes.mainBodyCopy}>Creating Web App Like Joy The Flower Blossom</h4>
          </div>
          <Container>
            <div className={classes.whiteBoard}>
              <span className={classes.verticalLine}></span>
              <div className={classes.illustrationWrapper}>
                <div className={classes.illustrationImageLeft}></div>
                <div className={classes.illustrationImageCenter}></div>
                <div className={classes.illustrationImageRight}></div>
              </div>
            </div>
          </Container>
        </div>
        <Container className={classes.mainContent}>
          <Helmet title="Beranda" />
          <Spacer />
          {/* <Card>
            <CardMedia
              overlay={<CardTitle title={config.app.title} subtitle={config.app.description} />}>
              <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/CY0BG49341.jpg" alt="girl-learn" />
            </CardMedia>
            <Content>
              This project is used as the foundation for all frontend based on web.
              Contains sample layouts, custom components, code standardization,
              and examples of cases that are often used (CRUD, etc).
              <br />
              <br />
              It could also be a reference for QA and UI / UX Designer
              in order to ensure the design and user interface can be in deployments (on functionality/compatibility).
              <br />
              <br />
              If there are additional, bugs, etc, please contact us.
              <br />
              <br />
              <br />
              regards,
              <br />
              <br />
              <strong>Pinjam's Front End Team</strong>
            </Content>
          </Card>*/}

          <Spacer />
          <div className={classes.contentWrapper}>
            <h4 className={classes.contentText}>Pretty Web App Generator Pretty Web App Generator</h4>
            <p className={classes.contentBodyCopy}>Creating Web App Like Joy The Flower Blossom</p>
          </div>

        </Container>
        <div className={classes.iconBlock}>
          <Container>
            <div className={classes.iconWrapper}>
              <div className={classes.iconItem}>
                <div className={classes.iconImage}></div>
                <h3 className={classes.iconText}>Quick</h3>
              </div>
              <div className={classes.iconItem}>
                <div className={classes.iconImage}></div>
                <h3 className={classes.iconText}>Modular</h3>
              </div>
              <div className={classes.iconItem}>
                <div className={classes.iconImage}></div>
                <h3 className={classes.iconText}>Scalable</h3>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
