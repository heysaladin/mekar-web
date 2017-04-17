import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import MdSearch from 'react-icons/lib/md/search';
import { debounce } from 'throttle-debounce';
import injectSheet from 'react-jss';

import styles from './searchBoxStyles';
@injectSheet(styles)

export default class SearchBox extends Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  /**
   * Mencegah bounch sebelum component dibuat
   *
   * @returns {void}
   * @memberOf SearchBox
   */
  componentWillMount = () => {
    this.onTyping = debounce(500, this.onTyping);
  }

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
            hintText="Cari nama toko atau alamat terdekat"
            ref={(textField) => { this.searchName = textField; }}
            fullWidth
            style={styles.searchBoxInput}
            underlineShow={false}
            underlineFocusStyle={styles.searchBoxUnderline}
            underlineStyle={styles.searchBoxUnderline}
            onChange={this.onTyping}
            hintStyle={styles.searchBoxIconHint} />
          <MdSearch style={styles.searchBoxIcon} />
        </div>
      </div>
    );
  }
}
