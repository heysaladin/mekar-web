import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { debounce } from 'throttle-debounce';

import TextField from 'material-ui/TextField';
import MdSearch from 'react-icons/lib/md/search';

import styles from './searchBoxStyles';

/**
 * @export
 * @class SearchBox
 * @extends {Component}
 */
@injectSheet(styles)
export default class SearchBox extends Component {

  static propTypes = {
    sheet: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  /**
   * Bind event onTyping
   */
  componentWillMount = () => {
    this.onTyping = debounce(500, this.onTyping);
  }

  /**
   * Handle event typing di searchbox
   *
   * @return void
   * @memberOf SearchBox
   */
  onTyping = () => {
    const { onSearch } = this.props;

    onSearch(this.searchName.input.value);
  }

  render() {
    const { sheet: {
        classes
      } } = this.props;

    return (
      <div className={classes.wrap}>
        <div className={classes.positionRelative}>
          <TextField
            hintText="Cari barang hasil taksiran"
            ref={(textField) => { this.searchName = textField; }}
            style={styles.searchBoxInput}
            underlineStyle={styles.searchBoxUnderline}
            onChange={this.onTyping}
            underlineShow={false}
            fullWidth />
          <MdSearch style={styles.searchBoxIcon} />
        </div>
      </div>
    );
  }
}
