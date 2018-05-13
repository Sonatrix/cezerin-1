import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class FooterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  isActiveToggle() {
    this.setState({
      isActive: !this.state.isActive,
    });
  }
  render() {
    const {title, items} = this.props;
    let ulItems = null;

    if (items && items.length > 0) {
      ulItems = items.map((item, index) => (
        <li key={index}>
          <NavLink to={item.url || ''}>{item.text}</NavLink>
        </li>
      ));
    }

    return (
      <div className="column is-3">
        <div
          className={`footer-title mobile-padding${
            this.state.isActive ? ' footer-menu-open' : ''
          }`}
          onClick={this.isActiveToggle}
        >
          {title}
          <span />
        </div>
        <ul className="footer-menu">{ulItems}</ul>
      </div>
    );
  }
}
