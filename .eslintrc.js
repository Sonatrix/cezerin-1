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
    "import/no-dynamic-require": 'off',
    "import/no-extraneous-dependencies": 'off',
    "import/no-unresolved": 'never',
    "react/prop-types": 'off',
    "react/no-array-index-key": 'off',
    "no-restricted-syntax": 'off',
    "no-loop-func": 0,
    "jsx-a11y/no-static-element-interactions":'off',
    "jsx-a11y/click-events-have-key-events": 'off',
    "guard-for-in": 0,
    "no-bitwise": 0,
    "no-alert": 2,
    "no-nested-ternary": 0,
    "class-methods-use-this": 0,
    "jsx-a11y/label-has-for": 'off',
    "jsx-a11y/anchor-is-valid": 'off',
    "jsx-a11y/anchor-has-content": 'off',
    "jsx-a11y/no-noninteractive-element-interactions": 'off',
    "no-multi-assign":0
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  }
}