import React, {PureComponent} from 'react';
import {themeSettings} from '../../lib/settings';
import HeadMenuItem from './headMenuItem';

export default class HeadMenu extends PureComponent {
  render() {
    const {categories, onClick, isMobile} = this.props;
    let addItemsToMenu = [];
    if (themeSettings.header_menu && themeSettings.header_menu.length > 0) {
      addItemsToMenu = themeSettings.header_menu.map(item => ({
        name: item.text,
        path: item.url,
        id: item.id || '',
        parent_id: item.parent_id || null,
      }));
    }

    const menuItems = [...categories, ...addItemsToMenu];

    const items = menuItems
      .filter(category => category.parent_id === null)
      .map((category, index) => (
        <HeadMenuItem
          key={index}
          category={category}
          onClick={onClick}
          categories={categories}
          level={1}
          isMobile={isMobile}
        />
      ));

    return <ul className="nav-level-0">{items}</ul>;
  }
}
