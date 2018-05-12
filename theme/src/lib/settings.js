/* eslint-disable */
let themeSettings = {};
let text = {};

// Client - from Redux state
if (typeof window !== 'undefined') {
  const appText = window.__APP_TEXT__;
  const {
    app: {themeSettings: settings}
  } = window.__APP_STATE__;

  if (settings) {
    themeSettings = settings;
  }

  if (appText) {
    text = appText;
  }
}

// Server - from render page method
const updateThemeSettings = ({settings, text: appText}) => {
  themeSettings = settings;
  text = appText;
};

export {themeSettings, text, updateThemeSettings};
