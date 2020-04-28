module.exports = {
    env: {
        browser: true,
        es6: true,
        amd: true,
        node: true,
        jest: true,
        jquery: true,
        mongo: true
    },
    plugins: [
        'compat',
        'prettier',
        'jest',
        '@typescript-eslint',
        'eslint-plugin-tsdoc'
    ],
    extends: [
        'airbnb',
        'standard',
        'google',
        'eslint:recommended',
        'plugin:jest/recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        importScripts: 'readonly',
        workbox: 'readonly'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-new': 'off',
        'no-continue': 'off',
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'class-methods-use-this': 'off', // TODO:
        'no-restricted-globals': 'off', // TODO:
        'no-invalid-this': 'off',
        'global-require': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'import/no-dynamic-require': 'off',
        'no-bitwise': 'off',
        'no-multi-assign': 'off',
        'default-case': 'off',
        'no-caller': 'off', // TODO:
        'no-fallthrough': 'off',
        'consistent-return': ['off', { treatUndefinedAsUnspecified: true }],
        radix: ['off', 'as-needed'],
        'class-methods-use-this': 'off',
        'no-param-reassign': ['off', { props: false }],
        'no-nested-ternary': 'off',
        'no-restricted-globals': 'off',
        'no-useless-constructor': 'off',
        'standard/no-callback-literal': 'off',
        'no-fallthrough': 'off', // TODO:
        'no-underscore-dangle': 'off',
        'no-plusplus': ['off', { allowForLoopAfterthoughts: true }],
        '@typescript-eslint/no-this-alias': 'off', // TODO:
        '@typescript-eslint/no-explicit-any': 'off', // TODO: the big boi
        '@typescript-eslint/no-unused-vars': 'off', // TODO:
        '@typescript-eslint/no-empty-function': 'off', // TODO:
        '@typescript-eslint/ban-ts-ignore': 'off', // TODO:
        '@typescript-eslint/explicit-function-return-type': 'off',
        'react/static-property-placement': 'off',
        'no-prototype-builtins': 'off', // TODO:
        'no-case-declarations': 'off', // TODO:
        'no-restricted-syntax': 'off', // 🤔
        'no-shadow': 'off',
        curly: ['warn', 'multi'],
        'prettier/prettier': 'off',
        // 'tsdoc/syntax': 'warn',

        semi: ['warn', 'always'],
        indent: [
            'off',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true
            }
        ],
        quotes: ['warn', 'single']
    },
    ignorePatterns: [
        'node_modules/',
        '*.json',
        './client/lib/',
        './client/**/lib/'
    ]
};
