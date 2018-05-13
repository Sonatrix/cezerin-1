import React, {PureComponent} from 'react';
import {themeSettings} from '../lib/settings';
import FooterMenu from './footerMenu';

const SocialIcons = ({icons}) => {
  if (icons && icons.length > 0) {
    const items = icons.map((icon, index) => (
      <a
        key={index}
        href={icon.url || ''}
        target="_blank"
        rel="noopener"
        title={icon.type}
        className={icon.type}
      />
    ));
    return <p className="social-icons">{items}</p>;
  }
  return null;
};

const Contacts = ({contacts}) => {
  if (contacts && contacts.length > 0) {
    const items = contacts.map((item, index) => {
      const contact = item ? item.text : null;
      if (contact && contact.indexOf('@') > 0) {
        return (
          <li key={index}>
            <a href={`mailto:${contact}`}>{contact}</a>
          </li>
        );
      }
      return <li key={index}>{contact}</li>;
    });
    return <ul className="footer-contacts">{items}</ul>;
  }
  return null;
};

export default class Footer extends PureComponent {
  render() {
    const {settings} = this.props;
    const footerLogoUrl =
      themeSettings.footer_logo_url && themeSettings.footer_logo_url.length > 0
        ? `/assets/images/${themeSettings.footer_logo_url}`
        : settings.logo;

    return (
      <section className="section section-footer">
        <hr />
        <footer>
          <div className="container">
            <div className="content">
              <div className="columns is-gapless">
                <div className="column is-5">
                  <div className="mobile-padding">
                    <div className="footer-logo">
                      <img src={footerLogoUrl} alt="logo" />
                    </div>
                    <p>
                      <small>{themeSettings.footer_about}</small>
                    </p>
                    <Contacts contacts={themeSettings.footer_contacts} />
                    <SocialIcons icons={themeSettings.footer_social} />
                  </div>
                </div>
                <div className="column is-1 is-hidden-mobile" />
                <FooterMenu
                  title={themeSettings.footer_menu_1_title}
                  items={themeSettings.footer_menu_1_items}
                />
                <FooterMenu
                  title={themeSettings.footer_menu_2_title}
                  items={themeSettings.footer_menu_2_items}
                />
              </div>
            </div>
          </div>
        </footer>
      </section>
    );
  }
}
