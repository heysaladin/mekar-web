import React, { Component, PropTypes } from 'react';

import { Link as LinkScroll } from 'react-scroll';
// import Link from './Link';

class Navigation extends Component {

  render() {
    const htmlMenu = [];

    this.props.menus.forEach((menu, idx) => {
      const icon = (typeof menu.icon === 'undefined')
        ? null
        : <menu.icon style={this.props.menuIconStyle} />;

      const itemStyle = Object.assign(menu.style || {}, this.props.menuStyle);

      if (typeof menu.toElement !== 'undefined') {
        htmlMenu.push(
          <LinkScroll to={menu.toElement} offset={-150} smooth>
            <span style={itemStyle}>{icon} {menu.label}</span>
          </LinkScroll>
        );
      } else {
        htmlMenu.push(
          <a key={`link-${idx}`} href={menu.to} style={itemStyle}>{icon} {menu.label}</a>
        );
      }
    });

    return (
      <div role="navigation" style={this.props.style}>
        {[htmlMenu]}
      </div>
    );
  }

}

Navigation.propTypes = {
  menus: PropTypes.array,
  style: PropTypes.object,
  menuStyle: PropTypes.object,
  menuIconStyle: PropTypes.object
};

export default Navigation;
