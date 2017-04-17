import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Divider from 'material-ui/Divider';
import { currency, slugify } from 'utils/filter';

import { Spacer, Link } from '../../../UI';
import styles from './appraisalItemStyles';

@injectSheet(styles)
class AppraisalItem extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  render() {
    const { sheet: {
      classes
    }, data } = this.props;

    return (
      <div key={`taksiran-label-${data.id}`}>
        <div className={classes.wrap}>
          {data.name || '-'}
          &nbsp;ditaksir seharga:
          <br />
          <strong>{currency(data.price) || '-'}</strong>
          <Spacer />
          <Link to={`/riwayat-taksiran/${data.id}/${slugify(data.name)}`}>Detail</Link>
        </div>
        <Divider />
      </div>
    );
  }
}

export default AppraisalItem;
