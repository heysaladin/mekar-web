import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';

import decorator from './decorator.png';
import illustrationClassdiagram from './illustration-1-classdiagram.png';
import illustrationArrow from './illustration-arrow.png';
import illustrationWebapp from './illustration-2-webapp.png';
import featureQuick from './icon-feature-1-quick.png';
import featureModular from './icon-feature-2-modular.png';
import featureScalable from './icon-feature-3-scalable.png';

import {
  Container,
  Spacer
} from '../../UI';

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
    fontSize: 40,
    background: '-webkit-linear-gradient(left top, #8fefff, #80d056)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },

  mainBodyCopy: {
    textAlign: 'center',
    color: 'white',
    margin: '10px 0',
    background: '-webkit-linear-gradient(left top, #8fefff, #80d056)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
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
    margin: '140px auto 0',
    width: '70%'
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
    marginTop: -63,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    left: 0,
    right: 0
  },
  iconItem: {
    flex: 1,
    background: 'transparent'
  },
  iconImageQuick: {
    width: 125,
    height: 125,
    margin: '0 auto',
    backgroundSize: 'auto',
    backgroundColor: 'transparent',
    backgroundImage: `url(${featureQuick})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  iconImageModular: {
    width: 125,
    height: 125,
    margin: '0 auto',
    backgroundSize: 'auto',
    backgroundColor: 'transparent',
    backgroundImage: `url(${featureModular})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  iconImageScalable: {
    width: 125,
    height: 125,
    margin: '0 auto',
    backgroundSize: 'auto',
    backgroundColor: 'transparent',
    backgroundImage: `url(${featureScalable})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
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
    flex: 3,
    margin: '5%',
    backgroundSize: 'contain',
    backgroundColor: 'transparent',
    backgroundImage: `url(${illustrationClassdiagram})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  illustrationImageCenter: {
    width: '20%',
    height: '100%',
    flex: 1,
    backgroundSize: 'contain',
    backgroundColor: 'transparent',
    backgroundImage: `url(${illustrationArrow})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  },
  illustrationImageRight: {
    width: '40%',
    height: '100%',
    flex: 3,
    margin: '5%',
    backgroundSize: 'contain',
    backgroundColor: 'transparent',
    backgroundImage: `url(${illustrationWebapp})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
};

@injectSheet(styles)

export default class Home extends Component {

  static propTypes = {
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
          <Spacer />
          <div className={classes.contentWrapper}>
            <h4 className={classes.contentText}>Create web applications that are modular and have high scalability in a short time</h4>
            <p className={classes.contentBodyCopy}>Convert the Class Diagram into a web application.</p>
          </div>

        </Container>
        <div className={classes.iconBlock}>
          <Container>
            <div className={classes.iconWrapper}>
              <div className={classes.iconItem}>
                <div className={classes.iconImageQuick}></div>
                <h3 className={classes.iconText}>Quick</h3>
              </div>
              <div className={classes.iconItem}>
                <div className={classes.iconImageModular}></div>
                <h3 className={classes.iconText}>Modular</h3>
              </div>
              <div className={classes.iconItem}>
                <div className={classes.iconImageScalable}></div>
                <h3 className={classes.iconText}>Scalable</h3>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
