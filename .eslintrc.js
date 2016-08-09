module.exports = {
    'extends': 'airbnb',
    'installedESLint': true,
    'plugins': [
        'react',
    ],
    'settings': {
      'import/resolver': 'webpack',
    },
    'env': {
      browser: true,
      webextensions: true,
    },
    'rules': {
      'import/extensions': 2,
      'new-cap': 0,
      'no-underscore-dangle': 0,
      'react/require-extension': 0,
    }
};
