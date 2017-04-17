import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectSheet from 'react-jss';
// import Card from 'material-ui/Card/Card';
// import CardMedia from 'material-ui/Card/CardMedia';
// import CardTitle from 'material-ui/Card/CardTitle';

// import { connect } from 'react-redux';
// import config from 'config';

import { Container, Spacer } from '../../UI'; // Content,

const styles = {
  openingArea: {
    background: '#444',
    width: '100%',
    height: 300,
    marginTop: -50
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
        </div>
        <Container>
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

        </Container>
      </div>
    );
  }
}
