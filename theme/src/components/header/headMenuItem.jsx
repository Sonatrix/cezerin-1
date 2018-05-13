import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class HeadMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  onMouseEnterHandler() {
    if (!this.props.isMobile && this.props.level === 1) {
      this.setState({
        isActive: true,
      });
    }
  }

  onMouseLeaveHandler() {
    if (!this.props.isMobile && this.props.level === 1) {
      this.setState({
        isActive: false,
      });
    }
  }

  isActiveToggle() {
    this.setState({
      isActive: !this.state.isActive,
    });
  }
  render() {
    const {categories, category, onClick, level, isMobile} = this.props;
    const items = categories
      .filter(item => item.parent_id === category.id)
      .map((subcategory, index) => (
        <HeadMenuItem
          key={index}
          category={subcategory}
          onClick={onClick}
          categories={categories}
          level={level + 1}
          isMobile={isMobile}
        />
      ));
    const hasItems = items.length > 0;

    return (
      <li
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.onMouseLeaveHandler}
        onMouseUp={this.onMouseLeaveHandler}
        className={
          (level === 2 ? 'column is-3' : '') +
          (this.state.isActive ? ' is-active' : '') +
          (hasItems ? ' has-items' : '')
        }
      >
        <div className="cat-parent">
          <NavLink
            activeClassName="is-active"
            className={hasItems ? 'has-items' : ''}
            to={category.path}
            onClick={onClick}
          >
            {category.name}
          </NavLink>
          {hasItems && isMobile && <span onClick={this.isActiveToggle} />}
        </div>
        {hasItems && (
          <ul
            className={`${
              level === 1 ? 'columns is-gapless is-multiline' : ''
            } nav-level-${level}`}
          >
            {items}
          </ul>
        )}
      </li>
    );
  }
}
