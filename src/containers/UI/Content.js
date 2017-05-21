import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Layout from '../App/Layout';

const styles = {
  content: {
    padding: Layout.margin - 5,
    fontSize: Layout.fontSize,
    color: Layout.textColor,
    lineHeight: Layout.lineHeight
  }
};

@injectSheet(styles)
class Content extends Component {
  static muiName = 'Content';

  static propTypes = {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: PropTypes.bool,
    /**
     * Can be used to render elements inside the Card Text.
     */
    children: PropTypes.node.isRequired,
    /**
     * Override the CardText color.
     */
    color: PropTypes.string,
    /**
     * If true, this card component is expandable.
     */
    expandable: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    // style: PropTypes.object,

    sheet: PropTypes.object.isRequired,

    className: PropTypes.string
  };

  static defaultProps = {
    actAsExpander: false,
    color: Layout.textColor,
    expandable: false,
    classes: {},
    // style: {},
    className: null
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      sheet: { classes }, // eslint-disable-line no-unused-vars
      actAsExpander, // eslint-disable-line no-unused-vars
      children,
      color, // eslint-disable-line no-unused-vars
      expandable, // eslint-disable-line no-unused-vars
      className,
      // ...other,
    } = this.props;

    return (
      <div className={`${classes.content} ${className}`}>
        {children}
      </div>
    );
  }
}

export default Content;
