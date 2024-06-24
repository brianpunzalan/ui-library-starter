import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import {
  configs as reactHooksEslintConfigs,
  rules as reactHooksEslintRules,
} from 'eslint-plugin-react-hooks'
import { rules as reactRefreshEslintRules } from 'eslint-plugin-react-refresh'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const reactRefreshEslint = {
  plugins: {
    'react-refresh': {
      configs: {},
      rules: {
        ...reactRefreshEslintRules,
      },
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}

const reactHooksEslint = {
  plugins: {
    'react-hooks': {
      configs: {},
      rules: {
        ...reactHooksEslintRules,
      },
    },
  },
  rules: {
    ...reactHooksEslintConfigs.recommended.rules,
  },
}

const jsdocEslint = [
  jsdoc.configs['flat/recommended-typescript-error'],
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    rules: {
      'jsdoc/require-description': [
        'warn',
        {
          contexts: [
            'FunctionDeclaration',
            'MethodDefinition',
            'ClassDeclaration',
            'FunctionExpression',
          ],
        },
      ],
    },
  },
]

const ignoredFiles = [
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['*.config.js', '*.config.ts'],
  },
]

export default tseslint.config(
  ...ignoredFiles,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooksEslint,
  reactRefreshEslint,
  ...jsdocEslint
)
