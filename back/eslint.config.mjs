import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },
  {
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'no-console': 'off',
      'eqeqeq': ['warn', 'always'],
      'curly': ['error', 'all'],
      'no-unused-vars': ['warn', { 'args': 'none' }],
      'no-duplicate-imports': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      'no-var': 'error',
      'prefer-const': 'error'
    },
  },
])
