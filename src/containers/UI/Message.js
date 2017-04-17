import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';

import { VelocityComponent } from 'velocity-react';
import MdError from 'react-icons/lib/md/error';

import Layout from '../App/Layout';
import Theme from '../App/Theme';

const styles = {
  messageError: {
    padding: Layout.marginSmall,
    border: `1px solid ${Theme.colorRed}`,
    color: Theme.colorRed,
    textAlign: 'left'
  },
  messageErrorIcon: {
    fontSize: 24,
    color: Theme.colorRed
  }
};

@injectSheet(styles)
class Message extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    visibility: PropTypes.any,
    type: PropTypes.string,
    text: PropTypes.node
  };

  static defaultProps = {
    type: 'success',
    text: 'Isi pesan disini',
    visibility: false
  }

  render() {
    const { sheet: { classes }, visibility, type, text } = this.props;

    return (
      <VelocityComponent animation={{ opacity: visibility ? 1 : 0 }} duration={300}>
        <div className={(type === 'success') ? classes.messageError : classes.messageError}>
          <MdError style={styles.messageErrorIcon} />
          <span>&nbsp;&nbsp;{text}</span>
        </div>
      </VelocityComponent>
    );
  }
}

export default Message;
