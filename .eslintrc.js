module.exports = {
  'extends': 'airbnb',
  'rules': {
    'no-underscore-dangle': 'off'
  },
  'globals': {
    'window': true,
    'document': true,
    'location': true,
    'localStorage': true,
  },
  'env': {},
  'plugins': [],
  settings: {
    'import/resolver': {
      'node': {
        'paths': ['./src'],
        'moduleDirectories': ['node_modules']
      }
    }
  }
};
