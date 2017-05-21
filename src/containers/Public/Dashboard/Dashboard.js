import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
// import Card from 'material-ui/Card/Card';

import { Container, Spacer } from '../../UI';
// Header,
// import { Content } from '../../UI';
// import { Link } from '../../UI';

import Layout from '../../App/Layout';

const styles = {
  openingArea: {
    background: '#2a6d5e',
    width: '100%',
    height: 150,
    marginTop: -50,
    backgroundImage: 'linear-gradient(120deg,#447f2c 0%,#2a6d5e 100%)'
  },
  verticalLine: {
    display: 'block',
    width: 2,
    height: 25,
    margin: '0 auto',
    background: '#6ec8ce',
    position: 'absolute',
    left: 0,
    right: 0
  },
  contentWrapper: {
    margin: '-116px auto 0'
  },
  listWrapper: {
    margin: '50px auto'
  },
  textCenter: Layout.textCenter
};

@injectSheet(styles)

export default class Dashboard extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired
  }

  render() {
    const { sheet: {
        classes
      } } = this.props;
    return (
      <div>
        <Container style={styles.contentWrapper}>
          <Helmet
            title="Dashboard" />
          <Spacer />
          <div className={classes.listWrapper}>
            Dashboard
          </div>
          <Spacer />
        </Container>
      </div>
    );
  }
}
