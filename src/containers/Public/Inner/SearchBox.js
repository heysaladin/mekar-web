import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
   * Bind event onTyping
   */
  componentWillMount = () => {
    this.onTyping = debounce(500, this.onTyping);
  }

  /**
   * Menangkap inputan teks pada inputText
   *
   * @returns void
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
            hintText="Search with keywords you want ..."
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
