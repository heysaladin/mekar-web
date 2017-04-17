import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import Layout from '../App/Layout';

const styles = {
  container: Layout.container
};

@injectSheet(styles)
class Container extends Component {
  static propTypes = {
    /**
     * Can be used to render elements inside the Card.
     */
    children: PropTypes.node.isRequired,
    /**
     * Override the inline-styles of the container element.
     */
    containerStyle: PropTypes.object,
    /**
     * If true, this card component is expandable. Can be set on any child of the `Card` component.
     */
    expandable: PropTypes.bool,
    /**
     * Whether this card is expanded.
     * If `true` or `false` the component is controlled.
     * if `null` the component is uncontrolled.
     */
    expanded: PropTypes.bool,
    /**
     * Whether this card is initially expanded.
     */
    initiallyExpanded: PropTypes.bool,
    /**
     * Callback function fired when the `expandable` state of the card has changed.
     *
     * @param {boolean} newExpandedState Represents the new `expanded` state of the card.
     */
    onExpandChange: PropTypes.func,
    /**
     * If true, this card component will include a button to expand the card. `CardTitle`,
     * `CardHeader` and `CardActions` implement `showExpandableButton`. Any child component
     * of `Card` can implements `showExpandableButton` or forwards the property to a child
     * component supporting it.
     */
    style: PropTypes.object,

    sheet: PropTypes.object.isRequired,

    className: PropTypes.string
  };

  static defaultProps = {
    expandable: false,
    expanded: null,
    initiallyExpanded: false,
    onExpandChange: null,
    containerStyle: {},
    style: {},
    className: null
  };

  state = {
    expanded: null
  };

  componentWillMount() {
    this.setState({
      expanded: this.props.expanded === null
        ? this.props.initiallyExpanded === true
        : this.props.expanded
    });
  }

  componentWillReceiveProps(nextProps) {
    // update the state when the component is controlled.
    if (nextProps.expanded !== null) {
      this.setState({ expanded: nextProps.expanded });
    }
  }

  handleExpanding = (event) => {
    event.preventDefault();
    const newExpandedState = !this.state.expanded;
    // no automatic state update when the component is controlled
    if (this.props.expanded === null) {
      this.setState({ expanded: newExpandedState });
    }
    if (this.props.onExpandChange) {
      this.props.onExpandChange(newExpandedState);
    }
  };

  render() {
    const {
      style, containerStyle, children, expandable, // eslint-disable-line no-unused-vars
      expanded: expandedProp, // eslint-disable-line no-unused-vars
      initiallyExpanded, // eslint-disable-line no-unused-vars
      onExpandChange, // eslint-disable-line no-unused-vars
      sheet: { classes },
      className,
    } = this.props;

    const expanded = this.state.expanded;
    const newChildren = React.Children.map(children, (currentChild) => {
      let doClone = false;
      let newChild;
      const newProps = {};
      let element = currentChild;
      if (!currentChild || !currentChild.props) {
        return null;
      }
      if (expanded === false && currentChild.props.expandable === true) {
        return;
      }

      if (currentChild.props.actAsExpander === true) {
        doClone = true;
        newProps.onTouchTap = this.handleExpanding;
        newProps.style = Object.assign({
          cursor: 'pointer'
        }, currentChild.props.style);
      }
      if (doClone) {
        element = React.cloneElement(currentChild, newProps, currentChild.props.children, newChild);
      }
      return element;
    }, this);

    return (
      <div className={`${classes.container} ${className}`}>
        <div style={style}>
          {newChildren}
        </div>
      </div>
    );
  }
}

export default Container;
