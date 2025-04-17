import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
   baseDirectory: __dirname,
})

const eslintConfig = [
   ...compat.extends('next/core-web-vitals', 'next/typescript'),
   {
      rules: {
         //   'no-unused-vars': 'off',
         '@typescript-eslint/no-unused-vars': 'off',
         '@typescript-eslint/ban-ts-comment': 'off',
         'react-hooks/exhaustive-deps': 'off',
      },
   },
   /*
   {
      files: ['*.ts', '*.tsx'],
      rules: {
         '@typescript-eslint/no-explicit-any': 'off',
         '@typescript-eslint/no-unused-vars': 'warn',
         '@typescript-eslint/no-empty-function': 'off',
         '@typescript-eslint/no-non-null-assertion': 'off',
         '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
   },
   {
      files: ['*.js', '*.jsx'],
      rules: {
         'no-unused-vars': 'warn',
      },
   },
   {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
         'import/no-anonymous-default-export': [
            'error',
            {
               allowArray: true,
               allowArrowFunction: true,
               allowAnonymousClass: true,
               allowAnonymousFunction: true,
               allowCallExpression: true,
               allowLiteral: true,
               allowObject: true,
            },
         ],
      },
   },
   {
      files: ['*.ts', '*.tsx'],
      rules: {
         'import/no-anonymous-default-export': [
            'error',
            {
               allowArray: true,
               allowArrowFunction: true,
               allowAnonymousClass: true,
               allowAnonymousFunction: true,
               allowCallExpression: true,
               allowLiteral: true,
               allowObject: true,
            },
         ],
      },
   },
   {
      files: ['*.js', '*.jsx'],
      rules: {
         'import/no-anonymous-default-export': [
            'error',
            {
               allowArray: true,
               allowArrowFunction: true,
               allowAnonymousClass: true,
               allowAnonymousFunction: true,
               allowCallExpression: true,
               allowLiteral: true,
               allowObject: true,
            },
         ],
      },
   },
   */
]

export default eslintConfig
