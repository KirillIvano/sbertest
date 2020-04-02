module.exports = {
    'env': {
        'es6': true,
        'browser': true,
        'node': true,
    },
    'extends': ['eslint:recommended', "plugin:react/recommended"],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'plugins': [
        'react',
        'react-hooks'
    ],
    settings: {
        react: {
            version: require('./package.json').dependencies.react,
        },
    },
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaVersion': 2019,
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true
        }
    },
    'globals': {
        SERVER_ORIGIN: true,
        IMAGE_HOST: true,
    },
    'rules': {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],

        // codestyle
        'arrow-spacing': ['error'],
        'prefer-arrow-callback': ['error'],
        'prefer-const': ['error'],
        'camelcase': ['error'],
        'comma-dangle': ['error', 'always-multiline'],
        'eol-last': ['error'],
        'key-spacing': ['error'],
        'no-trailing-spaces': ['error'],
        'handle-callback-err': ['error'],
        'max-len': ['warn', {code: 120}],
        'no-console': ['error'],
        
        'react/prop-types': 'off',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/boolean-prop-naming': 'error',
        'react/button-has-type': 'error',
        'react/destructuring-assignment': 'error',
        'react/no-deprecated': 'error',
        'react/no-typos': 'error',
        'react/no-unescaped-entities': 'error',
        'react/react-in-jsx-scope': 'error',
        'react/jsx-no-undef': 'error',
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-one-expression-per-line': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-tag-spacing': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
        'react/jsx-wrap-multilines': 'error',
    }
};