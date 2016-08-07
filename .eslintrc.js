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
      'no-underscore-dangle': 0,
      'new-cap': 0,
    }
};
