module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'airbnb',
    'prettier',
  ],
  'plugins': [
    'prettier',
  ],
  'rules': {
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'trailingComma': 'es5'
    }],
    'react/jsx-closing-bracket-location':'off',
    'react/jsx-closing-tag-location':'off',
    'react/jsx-curly-spacing':'off',
    'react/jsx-equals-spacing':'off',
    'react/jsx-first-prop-new-line':'off',
    'react/jsx-indent':'off',
    'react/jsx-indent-props':'off',
    'react/jsx-max-props-per-line':'off',
    'react/jsx-tag-spacing':'off',
    'react/jsx-wrap-multilines':'off',
    "import/extensions": "never",
    "no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 'off',
    "react/prop-types": 'off'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  }
}