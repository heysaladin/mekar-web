import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import Header from '../Shared/Header/Header';
import Navigation from '../Shared/Navigation/Navigation';
import Footer from '../Shared/Footer/Footer';

const styles = {
  layoutMargin: {
    paddingTop: 48,
    // use this commented styles for pushing footer to bottom
    // paddingBottom: Layout.footerHeight
  }
};

@injectSheet(styles)
@connect(
  state => ({
    online: state.online
  })
)
export default class Home extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    sheet: PropTypes.object.isRequired,
    user: PropTypes.object
  };

  static defaultProps = {
    user: {}
  }

  state = {
    toggleNav: false
  };

  toggleNavigation = () => this.setState({
    toggleNav: !this.state.toggleNav
  });

  handleClose = () => this.setState({ toggleNav: false });

  render() {
    const { sheet: { classes }, children, user } = this.props;
    const { toggleNav } = this.state;

    return (
      <div className={classes.layoutMargin}>
        <Header toggleNav={this.toggleNavigation} />

        <Navigation
          open={toggleNav}
          close={this.handleClose}
          menus={[]}
          identity={user} />

        <section className="content">
          {children}
        </section>

        <Footer />
      </div>
    );
  }
}
